import * as Yup from "yup";
import {
  phoneNumberValidator,
  verifyIranianNationalId,
} from "@persian-tools/persian-tools";

const nubmerRegex = /[0-9]+$/;

const sendPhoneSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(nubmerRegex, "شماره همراه خود را با حروف انگلیسی وارد کنید.")
    .required("شماره همراه الزامی میباشد")
    .min(11, "شماره همراه باید 11 رقم باشد")
    .max(11, "شماره همراه نباید بیشتر از 11 رقم باشد")
    .test("phoneValidation", "شماره همراه معتبر وارد کنید", (value) =>
      phoneNumberValidator(value)
    ),
  captcha: Yup.string()
    .required("کد امنیتی الزامی میباشد")
    .matches(nubmerRegex, "کد امنیتی را با حروف انگلیسی وارد کنید."),
});

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required(" نام الزامی میباشد"),
  lastName: Yup.string().required(" نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string()
    .matches(nubmerRegex, "کدملی خود را با حروف انگلیسی وارد کنید.")
    .required(" کدملی الزامی میباشد")
    .test(
      "validation_nationalCode",
      "کدملی معتبر وارد کنید",
      (value: any): any => {
        const result = verifyIranianNationalId(value);

        // عدد را به رشته تبدیل می‌کنیم
        const numString = value.toString();

        // از regex برای بررسی طول 10 رقمی استفاده می‌کنیم
        const regex = /^[0-9]{10}$/;

        let regextTest = regex.test(numString);

        return result && regextTest ? true : false;
      }
    ),
});

const signUpCitizensSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی میباشد"),
  lastName: Yup.string().required("نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string()
    .matches(nubmerRegex, "کدملی خود را با حروف انگلیسی وارد کنید.")
    .required("کد اتباع الزامی میباشد")
    .test("nationalCityzens", "کد معتبر وارد کنید", (value: any) => {
      if (value.toString().length === 8 || value.toString().length === 12) {
        return true;
      } else {
        return false;
      }
    }),
});

const editProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی میباشد"),
  lastName: Yup.string().required(" نام خانوادگی الزامی میباشد"),
  notionalNumber: Yup.string()
    .matches(nubmerRegex, "کدملی خود را با حروف انگلیسی وارد کنید.")
    .required(" کدملی الزامی میباشد")
    .test(
      "validation_nationalCode",
      "کدملی معتبر وارد کنید",
      (value: any): any => {
        const result = verifyIranianNationalId(value);

        // عدد را به رشته تبدیل می‌کنیم
        const numString = value.toString();

        // از regex برای بررسی طول 10 رقمی استفاده می‌کنیم
        const regex = /^[0-9]{10}$/;

        let regextTest = regex.test(numString);

        return result && regextTest ? true : false;
      }
    ),
  phoneNumber: Yup.string()
    .matches(nubmerRegex, "شماره همراه خود را با حروف انگلیسی وارد کنید.")
    .required("شماره همراه الزامی میباشد")
    .min(11, "شماره همراه باید 11 رقم باشد")
    .max(11, "شماره همراه نباید بیشتر از 11 رقم باشد")
    .test("phoneValidation", "شماره همراه معتبر وارد کنید", (value) =>
      phoneNumberValidator(value)
    ),
});

const ticketPublic = Yup.object().shape({
  fullName: Yup.string().required("نام و نام خانوادگی الزامی میباشد"),
  emailAddre: Yup.string()
    .email("ایمیل معتبر نمیباشد")
    .required("ایمیل الزامی میباشد"),
  phoneNumber: Yup.string()
    .matches(nubmerRegex, "شماره همراه خود را با حروف انگلیسی وارد کنید.")
    .required("شماره همراه الزامی میباشد")
    .test("phoneValidation", "شماره همراه معتبر وارد کنید", (value) =>
      phoneNumberValidator(value)
    ),
  title: Yup.string().required("عنوان الزامی میباشد"),
  message: Yup.string().required("دیدگاه الزامی میباشد"),
});
const otherPeopleSchema = Yup.object().shape({
  firstName: Yup.string().required(" نام الزامی میباشد"),
  lastName: Yup.string().required(" نام خانوادگی الزامی میباشد"),
  nationalNumber: Yup.string()
    .matches(nubmerRegex, "کدملی خود را با حروف انگلیسی وارد کنید.")
    .required(" کدملی الزامی میباشد")
    .test(
      "validation_nationalCode",
      "کدملی معتبر وارد کنید",
      (value: any): any => {
        const result = verifyIranianNationalId(value);

        // عدد را به رشته تبدیل می‌کنیم
        const numString = value.toString();

        // از regex برای بررسی طول 10 رقمی استفاده می‌کنیم
        const regex = /^[0-9]{10}$/;

        let regextTest = regex.test(numString);

        return result && regextTest ? true : false;
      }
    ),
});

export {
  sendPhoneSchema,
  signUpSchema,
  editProfileSchema,
  signUpCitizensSchema,
  ticketPublic,
  otherPeopleSchema,
};
