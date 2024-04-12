"use client"

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface ProductProps {
  product: {
    id: number;
    category: string;
    imageThumnail: string;
    name: string;
    price: string;
    inforMore: {
      image: string[];
      detail: string[];
    }
  }
}

export const Product = ({ product }: ProductProps) => {
  const router = useRouter();

  const handleProduct = (id: number, category: string) => {
    if (category == 'car') {
      router.push(`/car/${id}`);
    } else {
      router.push(`/motor/${id}`);
    }
  }

  const imageThumnail = `/images/${product.name}/${product.imageThumnail}.jpg`;
  return (
    <div className="flex flex-col">
      <Card shadow="sm" key={product.id} isPressable onPress={() => handleProduct(product.id, product.category)}>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={product.name}
            className="w-full object-cover h-[140px]"
            src={imageThumnail}
          />
        </CardBody>
        <CardFooter className="flex flex-col text-small justify-between">
          <b className="uppercase p-2 text-base">{product.name}</b>
          <p className="text-rose-500">{product.price}VND</p>
        </CardFooter>
      </Card>
    </div>
  )
}