export type ServicesDataType = {
      id : number,
      title : string,
      image : string,
      disabled : boolean,
      link : string
}
const servicesData : ServicesDataType[] = [
    
      {
            id : 2 ,
            title : "نوبت دهی پزشکان",
            link :"physicians",
            image : "/services_2.jpg",
            disabled : false
      },
      {
            id : 1 ,
            title : "پنل پزشکان",
            link :"/dr.arenap.ir/",
            image : "/services_1.jpg",
            disabled : false
      },
      {
            id : 3 ,
            title : "مشاوره آنلاین",
            link :"physician",
            image : "/services_3.jpg",
            disabled : true
      },
      {
            id : 4 ,
            title : "نوبت دهی کلینیک ها",
            link :"physician",
            image : "/services_4.jpg",
            disabled : true
      },
]
export default servicesData