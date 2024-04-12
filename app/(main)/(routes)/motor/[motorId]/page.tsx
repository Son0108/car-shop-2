import Carousel from "@/components/layout/carousel";
import { products } from "@/utils/data/product";
import {Divider} from "@nextui-org/react";

interface CarIdPageProps {
    params: {
        motorId: number;
    }
}

export default function MotorIdPage({ params }: CarIdPageProps) {

    const imageList: { src:  string; alt: string; }[] = [{src:"", alt: ""}];

    const productMotor = products.filter((motor) => { return motor.id == params.motorId; })

    productMotor[0].inforMore.image.map((image, index) => (
        imageList.push({src: `/images/${productMotor[0].name}/${image}.jpg`, alt: image})
    ))
    return (
        <div className="flex flex-col h-full w-full justify-between lg:mt-[100px] md:mt-[80px] mb-8 bg-slate-300 rounded-xl">
            <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                <Carousel imageInfo={imageList} />
                <div className="flex flex-col xl:py-16 md:px-12 sm:px-8">
                    <span className="text-3xl font-bold">
                        {productMotor[0].name}
                    </span>
                    <span className="text-rose-500 mt-1">
                        GIÁ: {productMotor[0].price}VND
                    </span>
                    <Divider className="my-4" />
                    <div>
                        <strong>Thông số kỹ thuật</strong>
                        {productMotor[0].inforMore.detail.map((info, index) => (
                            <p className="mt-1" key={index}>{info}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}