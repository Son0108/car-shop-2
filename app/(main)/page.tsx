import React from "react";
import { products } from "@/utils/data/product";
import { Product } from "@/components/product/product";
import { Divider, Link } from "@nextui-org/react";
import { sellers } from "@/utils/data/sellers";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="h-full w-full mt-[50px] mb-6">
      <div>
        <video controls loop autoPlay className="w-full h-[550px]" >
          <source src="/videos/vivo.mp4" type="video/mp4"></source>
        </video>
      </div>
      <div className="mb-4 mt-8">
        <strong className="text-black mb-4">Thông tin rao bán</strong>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-2">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
      <Divider className="my-4" />
      <div>
        <strong>Thông tin nhân viên mua bán xe</strong>
        <div className="my-4 ml-6">
          {sellers.map((seller) => (
            <div key={seller.id} className="flex flex-col mx-4 my-2">
              <span className="font-bold">{seller.name}</span>
              <div className="flex">
                <span className="text-sm mx-2 text-gray-500">SĐT: {seller.phone}    </span>
                <span className="text-sm mx-2 text-gray-500">ĐC: {seller.address}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed z-40 flex bottom-16 right-4 h-12 w-12 rounded-full bg-[#a7a2a2] p-2 cursor-pointer">
        <Link className="m-auto" href="http://m.me/270094589510315" target="_blank"><MessageCircle className="text-3xl m-auto" /></Link>
      </div>
    </div>
  );
}
