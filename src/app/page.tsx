import Patient from "@/components/forms/Patient";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PassKeyModal />}

      <section className="sub-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex item-center gap-3">
            <Image
              src="/image/logoheart.png"
              height={1000}
              width={1000}
              alt="mediManage logo"
              className="mb-12 h-10 w-fit"
            />
            <span className="text-white font-extrabold text-3xl">
              MediManage
            </span>
          </div>
          <Patient />
          <div className="flex justify-between mt-20 text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 MediManage
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/image/greennurse.jpeg"
        alt="nurse-welcoming"
        width={565}
        height={565}
        className="side-img max-w-[50%] rounded-lg opacity-50"
      />
    </div>
  );
}
