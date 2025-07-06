import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex bg-primary/10 border border-primary/30 rounded-lg shadow-md p-5">
        <div className="flex-shrink-0 bg-primary/10 p-4 rounded-full mb-4:mb-0 md:mr-6">
          <ZapIcon className="size-10 text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl text-secondary font-bold mb-2">
            Rate Limit Reached
          </h3>
          <p className="text-base-content mb-1">
            You've made too many request in a short period. Please wait a
            moment.
          </p>
          <p className="text-sm text-base-content/50">
            Try Again in a few seconds for the best Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
