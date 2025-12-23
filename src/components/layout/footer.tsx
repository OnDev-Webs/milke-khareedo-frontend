import FooterLogo from "@/assets/footer-logo.svg";
import Link from "next/link";
import Image from "next/image";
import FacebookIcon from "@/components/icons/FacebookIcon";
import TwitterIcon from "@/components/icons/TwitterIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="bg-neutral-800 py-20 pb-[50px]">
        <div className="container mx-auto">
          <div className="w-full inline-flex justify-between items-start">
            <div className="w-96 inline-flex flex-col justify-start items-start gap-7">
              <div className="self-stretch h-60 flex flex-col justify-start items-start gap-7">
                <Link href="/">
                  <Image
                    src={FooterLogo}
                    alt="Footer Logo"
                    width={303}
                    height={72}
                  />
                </Link>
                <p className="self-stretch justify-start text-white text-lg font-medium leading-7">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it ....
                </p>
              </div>
              <div className="size- inline-flex justify-start items-center gap-2.5 py-[30px]">
                <Link href="/" className="size- p-3.5 bg-white rounded-[110px] flex justify-center items-center gap-2.5">
                  <FacebookIcon />
                </Link>
                <Link href="/" className="size- p-3.5 bg-white rounded-[110px] flex justify-center items-center gap-2.5">
                  <TwitterIcon />
                </Link>
                <Link href="/" className="size- p-3.5 bg-white rounded-[110px] flex justify-center items-center gap-2.5">
                  <LinkedinIcon />
                </Link>
                <Link href="/" className="size- p-3.5 bg-white rounded-[110px] flex justify-center items-center gap-2.5">
                  <InstagramIcon />
                </Link>
              </div>
            </div>
            <div className="size- flex justify-start items-center gap-5">
              <div className="w-48 inline-flex flex-col justify-start items-start gap-7">
                <h6 className="self-stretch justify-start text-white text-2xl font-semibold">
                  Links
                </h6>
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                </div>
              </div>
              <div className="w-48 inline-flex flex-col justify-start items-start gap-7">
                <h6 className="self-stretch justify-start text-white text-2xl font-semibold">
                  Links
                </h6>
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                </div>
              </div>
              <div className="w-48 inline-flex flex-col justify-start items-start gap-7">
                <h6 className="self-stretch justify-start text-white text-2xl font-semibold">
                  Links
                </h6>
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                  <Link href="/" className="self-stretch justify-start text-white text-lg font-medium">
                    Link Name
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 w-full bg-white inline-flex flex-col justify-start items-start gap-2.5">
        <div className="container mx-auto">
          <div className="w-full inline-flex justify-between items-center">
            <p className="justify-start text-zinc-400 text-base font-normal">
              © Copyright {currentYear} MILKE KHEREEDO
            </p>
            <div className="size- flex justify-start items-center gap-3.5">
              <Link href="/terms-and-conditions" className="justify-start text-zinc-400 text-base font-normal">
                Terms of use
              </Link>
              <Link href="/privacy-policy" className="justify-start text-zinc-400 text-base font-normal">
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
