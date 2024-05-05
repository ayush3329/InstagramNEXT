import NavBar from "@/Components/Navbar";

const Layout = ({children}: {children:React.ReactNode}) => {
    return ( <div className="h-[100%] w-[100%] flex bg-black">
        <NavBar/>
        {children}
    </div> );
}
 
export default Layout;