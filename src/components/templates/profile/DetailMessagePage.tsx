"use client"
import ButtonElement from '@/components/elements/ButtonElement'
import Loader from '@/components/elements/Loader'
import Toastify from '@/components/elements/toasts/Toastify'
import CloseIcon from '@/components/icons/CloseIcon'
import MoreIcon from '@/components/icons/profile/MoreIcon'
import TitlePagesMobile from '@/components/modules/titles/TitlePagesMobile'
import { http, httpFormData } from '@/services/axios'
import { apiDomainNobat } from '@/services/getApiUrl'
import { createMessage, deleteMessage, messageDetail, textConsultation } from '@/services/textConsultation/textConsultation'
import urls from '@/services/urls'
import { MessageType } from '@/types/consultation'
import cn from '@/utils/clsxFun'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

const DetailMessagePage = ({ messageId }: { messageId: string }) => {
    const queryClient = useQueryClient();
    const [files, setFiles] = useState<File[] | []>([])

    const [uploadPercent, setUploadPercent] = useState(0)
    const chatBox = useRef<any>(null)
    const chatsScroll = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [message, setMessage] = useState("")
    const [messageInfoDeleteId, setMessageInfoDeleteId] = useState<number>(0)
    const [source, setSource] = useState<any>()
    const [showProgress, setShowProgress] = useState(false)
    const changeHandler = (value: string) => {
        setMessage(value)
    }
    useEffect(() => {
        if (typeof window !== undefined && window.innerWidth >= 920) {
            window.scrollTo({ top: 94, behavior: "smooth" })
            inputRef.current?.focus()
            chatBox.current?.scrollTo({ top: chatBox.current.scrollHeight, behavior: "smooth" });
        }

    }, [])



    const { isLoading, data } = useQuery(["infoMessageDetail"], async () => {
        const res = await textConsultation(messageId)
        
        return res;
    })
    const messages = useQuery(["messageDetail"], async () => {
        const res = await messageDetail(messageId)
        if (res.resultCode === 200) {
            chatsScroll.current?.scrollIntoView({});

            
            return res.value;
        }
    })
    
    useEffect(() => {
        setSource(axios.CancelToken.source())
    }, [])


    const sendMessage = useMutation({
        mutationFn: async () => {


            if (message.length) {
                const res = await createMessage(messageId, message);
                if (res.resultCode === 200) {
                    setMessage("")
                }
                return res;
            } else {

                setShowProgress(true)

                const formData = new FormData();
                formData.append('TextConsultationId', messageId);
                for (let i = 0; i < files.length; i++) {
                    formData.append('Files', files[i]);
                }
                try {
                    const res = await httpFormData.post(`${apiDomainNobat}${urls.textConsultation.UploadFilesAndSigns.url}`, formData, {
                        onUploadProgress: (progressEvent) => {
                            let percentCompleted = 0
                            if (progressEvent.total) {
                                percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            }
                            setUploadPercent(percentCompleted)
                        },
                        cancelToken: source.token
                    })

                    if (res?.data?.resultCode === 200) {
                        setFiles([])
                        setShowProgress(false)
                    }
                } catch (error) {
                    if (axios.isCancel(error)) {

                        setShowProgress(false)
                    }
                }

            }
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`messageDetail`],
            });
            const infoMessageDetail = await queryClient.invalidateQueries({
                queryKey: [`infoMessageDetail`],
            });
        }
    })


    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await deleteMessage(messageInfoDeleteId)
            setMessageInfoDeleteId(0)
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`messageDetail`],
            });
        }
    })

    const showDeleteInfo = (messageId: number) => {
        setMessageInfoDeleteId(messageId)
    }


    const changeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesInput: any = event.target.files;

        if (filesInput.length > 3 || files.length > 3) {
            Toastify("error", "حداکثر فایل ارسالی سه عدد میباشد")
            setFiles([])
            return
        }
        for (const file of filesInput) {
            // Validate file based on its type or content
            if (file.type === 'application/pdf') {

            } else if (file.type.startsWith('image/')) {

            } else {
                Toastify("error", "فایلی ارسالی معتبر نمیباشد")
                return
            }
        }
        setFiles([...filesInput])
    }


    return (
        <>
            <TitlePagesMobile title={`دکتر ${data?.physicianProfile.firstName} ${data?.physicianProfile.lastName} `} />
            <div className='relative   h-[calc(100vh-10.6875rem)] md:h-[calc(100vh-3rem)] ' ref={chatBox}>
                <div className='flex justify-between p-1 items-center gap-1 text-md md:max-w-[28.125rem] bg-white  rounded-3xl mx-auto sticky top-[0px] z-20  shadow-shadow_category'>
                    <Image src="/user.png" width={500} height={500} alt="physician_image" className='size-[2.5rem]' />
                    <p className='flex justify-center items-center gap-1 '>مشاوره متنی با <Link href={"/"} className='text-primary font-bold'> دکتر {data?.physicianProfile.firstName} {data?.physicianProfile.lastName}
                    </Link> </p>
                    {isLoading ? <Loader color='border-primary' size='size-[2rem]' /> : ""}
                    <span className='block size-[2.5rem]'></span>
                </div>

                <div className='flex justify-start items-start gap-2 flex-col overflow-y-auto chat_box  pt-4 h-[calc(100%-6.8rem)] pb-[6rem]' ref={chatsScroll} >
                    {
                        !messages.isLoading && messages.data.length === 0 && <p className='text-md text-gray text-center w-full '>برای شروع مکالمه پیام ارسال کنید</p>
                    }
                    {
                        !messages.isLoading && messages?.data?.map((item: MessageType) => <MessageBox chatId={messageId} key={item.id} date={"dafs"} message={item.text} type={item.userType === 0} showDeleteInfo={showDeleteInfo} deleteInfo={messageInfoDeleteId === item.id} id={item.id} />)
                    }
                </div>

                <div className={
                    cn(
                        'sticky bottom-2 left-0 px-4 pb-4 z-20',
                        {
                            'z-[10]': messageInfoDeleteId !== 0
                        }
                    )
                }>
                    {
                        files.length !== 0 ? (
                            <div className='absolute bottom-full left-0 w-full py-2 px-4 flex justify-start items-center gap-2'>
                                {files?.map((item: any, index: number) => <button type='button' disabled={showProgress} className={
                                    cn(
                                        'p-1 rounded-3xl bg-gray  text-white w-fit flex justify-between items-center gap-1',
                                        {
                                            'cursor-pointer': !showProgress,
                                            "cursor-auto": showProgress
                                        }
                                    )
                                }
                                    key={index}
                                    onClick={() => {
                                        const newFiles = files.filter((file, index) => item.name !== file.name)
                                        setFiles(newFiles)
                                    }}
                                >
                                    {item.name}
                                    {!showProgress ? <CloseIcon color='stroke-white' /> : null}
                                </button>)}
                                {
                                    showProgress ? (
                                        <ProgressBarUpload percent={uploadPercent} cancelHandler={() => {
                                            source.cancel()
                                            setSource(axios.CancelToken.source)
                                        }} />
                                    ) : null
                                }
                            </div>
                        ) : null
                    }

                    {
                        !isLoading && data.files.length && files.length === 0 ? <div className={cn(
                            'absolute bottom-full left-0 w-full pb-2 pt-4 px-4  overflow-x-auto overflow-y-auto ',
                        )}>

                            <div className='flex justify-start items-center gap-2 w-fit  '>
                                {
                                    data.files.map((file: UploadItemBoxType) => <UploadItemBox {...file} key={file.id} />)
                                }
                            </div>
                        </div>
                            : null
                    }

                    <div className={cn(
                        "min-h-[2.625rem] flex justify-between items-end gap-2 w-full",
                        {
                            "hidden md:flex": messageInfoDeleteId !== 0,
                            "flex ": messageInfoDeleteId === 0,
                            "hidden": showProgress
                        }
                    )}>

                        <div className={
                            cn(
                                'flex  justify-between items-center gap-1 bg-white flex-1 min-h-[2.625rem] rounded-sm',

                            )
                        }>
                            {/* {message.length === 0 ? (
                                <button type='button' className='flex justify-center items-center min-w-[3rem] border-l-2 border-gray-400 '>
                                    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1604 15.2174H10.8398C8.63669 15.2174 6.85094 13.2927 6.85094 10.9203V6.29706C6.85094 3.92373 8.63669 2 10.8398 2H11.1604C13.3635 2 15.1501 3.92373 15.1501 6.29706V10.9203C15.1501 13.2927 13.3635 15.2174 11.1604 15.2174ZM17.0158 10.7829C17.0158 10.2539 17.4137 9.82626 17.9038 9.82626C18.394 9.82626 18.7918 10.2539 18.7918 10.7829C18.7918 15.0866 15.7673 18.6404 11.8886 19.1178V21.0434C11.8886 21.5714 11.4908 22 11.0006 22C10.5095 22 10.1126 21.5714 10.1126 21.0434V19.1178C6.23299 18.6404 3.2085 15.0866 3.2085 10.7829C3.2085 10.2539 3.60632 9.82626 4.09649 9.82626C4.58666 9.82626 4.98448 10.2539 4.98448 10.7829C4.98448 14.3558 7.68308 17.2629 11.0006 17.2629C14.3172 17.2629 17.0158 14.3558 17.0158 10.7829Z" fill="#272B2A" />
                                    </svg>
                                </button>
                            ) : null} */}

                            <TextareaAutosize ref={inputRef} className='max-h-[6.25rem] chat_box w-full px-2' value={message} onChange={(e) => changeHandler(e.target.value)} />

                            {message.length === 0 ? (
                                <>
                                    <label htmlFor="file" className='flex justify-center items-center min-w-[3rem] cursor-pointer'>
                                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.8389 22.0355C9.14824 24.6661 4.82208 24.6556 2.14646 21.9987C-0.528386 19.3433 -0.538926 15.0465 2.11047 12.3746L2.10824 12.3731L11.8404 2.70921L13.0575 1.5011C15.0732 -0.500366 18.3405 -0.500366 20.3562 1.5011C22.3719 3.50256 22.3719 6.74736 20.3562 8.74959L9.62821 19.2916L9.62444 19.2886C8.30236 20.5544 6.19515 20.5454 4.88883 19.2549C3.58252 17.9636 3.57429 15.8819 4.85507 14.577L4.8513 14.5725L6.04587 13.3937L12.0188 7.49426L13.2126 8.67461L6.04587 15.7528C5.38594 16.4038 5.38594 17.4604 6.04587 18.112C6.7058 18.7636 7.77586 18.7636 8.43501 18.112L19.1397 7.53994L19.1367 7.53771L19.1772 7.50318C20.5211 6.1691 20.5211 4.0049 19.1772 2.6709C17.8334 1.33691 15.6557 1.33682 14.3119 2.6709L14.2759 2.71144L14.2737 2.70989L13.0573 3.91723L3.32458 13.5812C1.30889 15.5826 1.30889 18.8274 3.32458 20.8289C5.34027 22.8304 8.60837 22.8304 10.6225 20.8289L19.1383 12.3731L20.3547 11.1657L21.571 12.3731L20.3547 13.5812L11.8404 22.037L11.8389 22.0355Z" fill="#C4C7C6" />
                                        </svg>
                                    </label>
                                    <input type='file' id='file' className='hidden ' accept=".pdf,image/*" multiple onChange={(e) => changeInputFile(e)} />
                                </>

                            ) : null}
                        </div>
                        <ButtonElement typeButton={message.length === 0 && files.length === 0 ? "gray-light" : 'primary'} customStyle='rounded-sm w-fit font-bold h-fit' handler={sendMessage.mutate} disabled={sendMessage.isLoading} loading={sendMessage.isLoading} >
                            {message.length === 0 && files.length ? "ارسال فایل ها" : "ارسال"}
                        </ButtonElement>
                    </div>

                    {
                        messageInfoDeleteId !== 0 ? (
                            <button type='button' className={cn(
                                "bg-white flex justify-center items-center gap-2 p-2 rounded-3xl text-md font-bold w-full",
                                "md:hidden"
                            )}
                                disabled={deleteMutation.isLoading}
                                onClick={() => deleteMutation.mutate()}
                            >

                                {
                                    deleteMutation.isLoading ? <Loader color='border-primary' size='size-[1rem]' /> : (<>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="#313033" />
                                        </svg>
                                        حذف پیام</>)
                                }
                            </button>
                        ) : null
                    }
                </div>
            </div >
        </>
    )
}

export default DetailMessagePage

type MessageBoxType = {
    message: string,
    type: boolean,
    date: string,
    deleteInfo: boolean,
    showDeleteInfo: (messageId: number) => void,
    chatId: string,
    id: number
}


const MessageBox = (props: MessageBoxType) => {
    const queryClient = useQueryClient();

    const { message, type, date, deleteInfo, showDeleteInfo, id, chatId } = props
    let timer: any;

    const touchStartHandler = () => {

        if (type) {
            timer = setTimeout(() => {
                showDeleteInfo(id)
            }, 800)
        }
    }
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await deleteMessage(+id)
            console.log(res);
        },
        onSuccess: async () => {
            const result = await queryClient.invalidateQueries({
                queryKey: [`messageDetail`],
            });
        }
    })

    return (
        <div className={
            cn(
                'flex justify-start items-center w-full md:relative group',
                {
                    "flex-row": type,
                    "flex-row-reverse pl-[2.5rem]": !type,
                    // "h-full": deleteInfo
                }
            )
        }>
            {
                type ? null :
                    <Link href={"/"} className='size-[2rem] absolute bottom-0 left-0'>
                        <Image src={"/user.png"} width={500} height={500} alt='physicians_image' className='w-full' />
                    </Link>
            }
            <div className={cn(
                "rounded-tl-lg rounded-br-lg text-lg  w-fit   max-w-[70%]  md:w-fit md:max-w-[70%]  p-2 z-[10] md:relative ",
                {
                    "rounded-tr-[0] rounded-bl-lg bg-link text-white": type,
                    " rounded-tr-lg bg-white  ": !type
                }
            )} onTouchStart={touchStartHandler}  >
                <p className='text-md text-wrap'>{message}</p>

                {
                    deleteInfo ? <div className={cn(
                        'absolute  bg-white overflow-hidden rounded-sm shadow-shadow_comment   z-20 md:block',
                        "md:top-full md:right-full md:w-[6.25rem]",
                        "hidden"
                    )} >
                        <button type="button" className='flex justify-center items-center w-full gap-2  py-2 px-1 cursor-pointer bg-error text-white transition-all duration-300' disabled={deleteMutation.isLoading} onClick={() => deleteMutation.mutate()} >
                            {deleteMutation.isLoading ? <Loader color='border-white' size='size-[1rem]' /> : <p>حذف پیام </p>}
                        </button>
                    </div> : null
                }
            </div>
            <span className={
                cn(
                    "px-2 hidden  cursor-pointer",
                    {
                        "group-hover:md:block": type
                    }
                )
            } onClick={() => showDeleteInfo(id)}><MoreIcon /> </span>
            {deleteInfo ? <div className='absolute md:fixed top-0 left-0  block w-full h-full rounded-lg md:rounded-none md:h-screen z-[9] bg-white/30 backdrop-blur-lg md:backdrop-blur-none md:bg-transparent ' onClick={() => showDeleteInfo(0)}></div> : null}
        </div>

    )
}


type ProgressBarUploadType = {
    percent: number,
    cancelHandler: () => void
}

const ProgressBarUpload = (props: ProgressBarUploadType) => {
    const { cancelHandler, percent } = props


    return (
        <div className={cn(
            'size-[40px] bg-white rounded-full relative flex justify-center items-center font-bold text-primary text-md group hover:cursor-pointer',
            'after:absolute after:left-0 after:top-0 after:block after:border-t-2 after:border-primary after:size-full after:rounded-full after:animate-spin '
        )}
            onClick={cancelHandler}

        >
            <p className='text-center group-hover:hidden'>{percent}%</p>
            <button type='button' className='hidden group-hover:block' >
                <CloseIcon color='stroke-primary' />
            </button>
        </div>
    )
}


type UploadItemBoxType = {
    contentType: string,
    fileName: string,
    fileUrl: string,
    id: number,
    uploadDate: string
}

const UploadItemBox = (props: UploadItemBoxType) => {

    const { contentType, fileName, fileUrl, id, uploadDate } = props

    return (
        <>
            {
                contentType === "application/pdf" ? <Link  href={fileUrl} target='_blank' className='bg-primary text-white rounded-sm overflow-hidden size-[3.25rem] flex justify-center items-center  '>
                    PDF
                </Link> : <Link  href={fileUrl} target='_blank' className='block rounded-sm overflow-hidden size-[3.25rem]'>
                    <Image src={fileUrl} width={500} height={500} alt={fileName} className='size-full' />
                </Link>
            }

        </>
    )
}