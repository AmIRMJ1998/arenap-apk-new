const urls = {
  //physician
  physician: {
    bestPhysician: {
      url: `/PublicServices/PhysicianProfile/TopRatedPhysicians`,
      method: "POST",
      parametrs: {
        pageNumber: "number",
        itemsCountPerPage: "number",
        cityId: "number",
        provinceId: "number",
      },
      query: {},
    },
    newestPhysicians: {
      url: "/PublicServices/PhysicianProfile/NewsetPhysicianProfiles",
      method: "GET",
    },
    physicianProfile: {
      url: "/PublicServices/PhysicianProfile/Page?url=",
      method: "GET",
      parametrs: {},
      query: {
        url: "physicianProfileUrl",
      },
    },
  },
  //login
  login: {
    sendPhone: {
      url: `/Public/Auth/SendCode`,
      method: "POST",
      parametrs: {
        input: {
          phoneNumber: "string",
        },
        captcha: {
          input: "string",
          key: "string",
        },
      },
      query: {},
    },
    sendOtp: {
      url: `/Public/Auth/VerifyCode`,
      method: "POST",
      parametrs: {
        verificationCode: "number",
        phoneVerificationCodeId: "string",
      },
      query: {},
    },
    signUp: {
      url: `/Public/Auth/Register`,
      method: "POST",
      parametrs: {
        nationalNumber: "string",
        gender: "string",
        cityId: "number",
        firstName: "string",
        lastName: "string",
        sessionId: "string",
      },
      query: {},
    },
    refreshToken: {
      url: "/Public/Auth/RefreshToken",
      method: "POST",
      parametrs: {
        refreshToken: "string",
      },
    },
  },
  //user
  user: {
    getUser: {
      url: "/User/UserInfo",
      method: "GET",
    },
    editUser: {
      url: "/User/UserInfo",
      method: "PUT",
    },
  },
  //captcha
  captcha: {
    captcha: {
      url: `/Public/Captcha`,
      method: "GET",
      parametrs: {},
      query: {},
    },
  },
  //comment
  comment: {
    create: {
      url: "/User/Comment/Create",
      method: "POST",
      paramters: {
        userPublicName: "string",
        userPhysicianProfileClanedarId: "string",
        physicianProfileId: "string",
        message: "string",
        isSuggested: "boolean",
        rate: "number",
        waitingTime: "number",
      },
    },
  },
  //appointment
  appointment: {
    myAppointment: {
      url: "/User/UserPhysicianProfileCalendar/List",
      method: "POST",
      parametrs: {},
      query: {},
    },
    cancel: {
      url: "/User/UserPhysicianProfileCalendar/DeleteAppointment/",
      method: "POST",
      parametrs: {},
      query: {
        calendarId: "string",
        index: "number",
        physicianProfileUrl: "string",
      },
    },
    calendarPhysician: {
      url: "/PublicServices/PhysicianProfileCalendar/",
      method: "GET",
      parametrs: {},
      query: {
        physicianProfileUrl: "string",
      },
    },
    ramainingTime: {
      url: "/Public/GetCurrentDate/GetRamainingTime",
      method: "GET",
    },
    lockedAppointment: {
      url: "/User/UserPhysicianProfileCalendar/CheckAppointmentStatus/CheckAppointmentStatus",
      method: "POST",
      parametrs: {
        calendarId: "string",
        physicianProfileId: "string",
        index: "number",
      },
      query: {},
    },
    firstAppointment: {
      url: "/User/UserPhysicianProfileCalendar/GetFirstForce/GetFirstForce/",
      method: "POST",
      query: {
        physicianId: "string",
      },
    },
    getOneAppointment: {
      url: "/User/UserPhysicianProfileCalendar/GetById/",
      method: "GET",
      parametrs: {},
      query: {
        apponitmentId: "string",
      },
    },
  },
  //favorite
  favorite: {
    getAll: {
      url: "/User/UserFavouritePhysicianProfile/List",
      method: "POST",
      parametrs: {
        pagedListInputDto: {
          pageNumber: "number",
          itemsCountPerPage: "number",
        },
      },
      query: {},
    },
    isFavorite: {
      url: "/User/UserFavouritePhysicianProfile/CheckIfPhysicianIsInFavouriteList/",
      method: "GET",
      parametrs: {},
      query: {
        profileId: "string",
      },
    },
    addFavorite: {
      url: "/User/UserFavouritePhysicianProfile",
      method: "POST",
      parametrs: {
        physicianProfileId: "string",
      },
      query: {},
    },
    deleteFavorite: {
      url: "/User/UserFavouritePhysicianProfile/",
      method: "DELETE",
      parametrs: {
        physicianProfileId: "string",
      },
      query: {
        physicianProfileId: "string",
      },
    },
  },

  //wallet
  wallet: {
    transctions: {
      url: "/User/PaymentHistory/List",
      method: "POST",
      parametrs: {
        pagedListInputDto: {
          pageNumber: 0,
          itemsCountPerPage: 0,
        },
      },
      query: {},
    },
  },

  //payment
  payment: {
    payment: {
      url: "/User/Payment/Payment",
      method: "POST",
      parametrs: {
        id: 0,
        amount: 0,
        paymentType: 0,
      },
      query: {},
    },
    createPaymentAppointment: {
      url: "/User/UserPhysicianProfileCalendar/Create",
      method: "POST",
      parametrs: {
        physicianProfileId: "string",
        calendarId: "string",
        index: "number",
        year: "number",
        month: "number",
        dayOfMonth: "number",
        dayOfWeek: "number",
      },
      query: {},
    },
  },

  //search
  search: {
    searchPrimary: {
      url: "/PublicServices/PhysicianProfile/Search",
      method: "POST",
      parametrs: {
        filter: "string",
        cityId: "number",
        provinceId: "number",
      },
      query: {},
    },
  },
  advanceSearch: {
    serach: {
      url: "/PublicServices/PhysicianProfile/AdvancedSearch",
      method: "GET",
      parametrs: {},
      query: {
        fitler: "string",
        cityName: "string",
        gender: "string",
        specilty: "string",
        disease: "string",
        sign: "string",
        service: "string",
        ConsultingPlan: "string",
        page: "number",
        itemsCountPerPage: "number",
      },
    },
  },
  //provinces
  provinces: {
    provinces: {
      url: "/Public/Address/SearchedCities",
      method: "GET",
    },
    cities: {
      url: "/Public/Address/Cities?provinceId=",
      method: "GET",
    },
    physicians: {
      url: "/PublicServices/PhysicianSpeciality/CitySpecialties/",
      method: "GET",
      query: {
        enNameCity: "string",
      },
    },
  },

  //price
  price: {
    getPrice: {
      url: "/Public/Captcha",
      method: "POST",
      parametrs: {},
    },
  },
  //comment site
  commentSite: {
    sendComment: {
      url: "/PublicServices/SupportTicket",
      method: "POST",
      parametrs: {
        fullName: "string",
        emailAddress: "string",
        phoneNumber: "string",
        title: "string",
        message: "string",
      },
    },
  },
  //specialities
  specialities: {
    getSpecialities: {
      url: "/PublicServices/PhysicianSpeciality/List",
      method: "GET",
      parametrs: {},
      query: {},
    },
  },
  //services
  services: {
    url: "/PublicServices/PhysicianSpeciality/ServicesList",
    method: "GET",
    parametrs: {},
    query: {},
  },
  //specialtyBelongings
  specialtyBelongings: {
    url: "/PublicServices/PhysicianSpeciality/SpecialtyBelongings/",
    method: "GET",
    parametrs: {},
    query: {
      speciality: "string",
    },
  },
  //textConsultation
  textConsultation: {
    listUser: {
      url: "/User/TextConsultation/List",
      method: "GET",
    },
    consultation: {
      url: "/User/TextConsultation/Get/",
      method: "GET",
      query: {
        id: "string",
      },
    },
    messagesConsultation: {
      url: "/User/TextConsultation/TextConsultationConversationList/",
      method: "GET",
      query: {
        id: "string",
      },
    },
    createMessage: {
      url: "/User/TextConsultation/Create",
      method: "POST",
      params: {
        textConsultationId: "string",
        text: "string",
      },
    },
    createConsulation: {
      url: "/User/TextConsultation/CreateTextConsultaion",
      method: "POST",
      paramters: {
        profileId: "string",
      },
    },
    UploadFilesAndSigns: {
      url: "/User/TextConsultation/UploadFilesAndSigns",
      method: "POST",
      paramters: {},
    },
    deleteMessage: {
      url: "/User/TextConsultation/DeleteConversation/",
      query: {
        chatId: "string",
      },
    },
  },
};

export const baseUrlSite = "https://arenap.ir";

export default urls;
