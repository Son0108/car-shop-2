import { Product } from "@/components/product/product";
import { products } from "@/utils/data/product";

export default function Motor() {
    let productMotor = products.filter((motor) => { return motor.category == 'motor'; })
    return (
        <div className="flex flex-col h-full w-full mt-[50px] mb-4">
            <div className="flex bg-black justify-center rounded-xl">
                <div className="p-4">
                    <span className="text-white text-lg font-bold w-full mx-auto">XE MÁY</span>
                </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4">
                {productMotor.map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </div>
        </div>
    )
}