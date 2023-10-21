import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

export default function SignIn() {
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your DairyCode and password to sign in!
        </p>


        {/* DairyCode */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="DairyCode*"
          placeholder="12345"
          id="DairyCode"
          type="number"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />

        <div className="mb-4 flex items-center justify-between px-2">

          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>

        <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
          Not registered yet?
        </span>
        <a
          href=" "
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Create an account
        </a>

      </div>
    </div>
  );
}
