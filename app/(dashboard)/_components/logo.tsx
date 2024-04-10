import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      height={40}
      width={40}
      alt="logo"
      src="/sust_couseware_logo.jpeg"
      className="rounded-full"
    />
  )
}