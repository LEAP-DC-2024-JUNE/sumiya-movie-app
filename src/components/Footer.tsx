import { Movielogo, Email, Phone } from "./svg";
export const Footer = () => {
  return (
    <div className="bg-[#4338CA]">
      <div className="px-5 py-10 flex flex-col gap-7 md:flex-row md:justify-between md:px-[80px] md:py-[80px]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Movielogo />
            <p className="text-[#FAFAFA]">Movie Z</p>
          </div>
          <p className="footer-text">© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-12 md:gap-[96px]">
          <div>
            <div className="flex flex-col gap-3">
              <p className="footer-text">Contact Information</p>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <Email />
                  <div>
                    <p className="footer-text">Email:</p>
                    <p className="footer-text">support@movieZ.com</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone />
                  <div>
                    <p className="footer-text">Phone:</p>
                    <p className="footer-text">+976 (11) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="footer-text">Follow us</p>
            <div className="flex flex-col gap-3 md:flex-row md:gap-3">
              <p className="footer-text">Facebook</p>
              <p className="footer-text">Instagram</p>
              <p className="footer-text">Twitter</p>
              <p className="footer-text">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
