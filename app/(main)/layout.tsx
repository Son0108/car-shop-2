import { NavigationNavbar } from "@/components/navigation/Navigation-navbar";

const MainLayout = async ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
      <div className="h-screen w-full">
        <div className="fixed top-0 left-0 right-0 z-40">
          <NavigationNavbar/>
        </div>
        <main className="w-full xl:px-[200px] lg:px-[150px] md:px-[50px] sm:px-11 py-7 z-0">
          {children}
          <footer className="bg-black fixed flex bottom-0 right-0 left-0 z-30 h-10">
            <span className="text-white m-auto">CÔNG TY CỔ PHẦN HỒNG PHƯỚC</span>
          </footer>
        </main>
      </div>
     );
  }
   
  export default MainLayout;