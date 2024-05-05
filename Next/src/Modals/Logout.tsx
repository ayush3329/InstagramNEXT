import { RxCross2 } from "react-icons/rx";

type LogOutModalProps = {
    setLogout: React.Dispatch<React.SetStateAction<boolean>>,
    HandleLogOut: () => void
}

const LogOut = ({setLogout, HandleLogOut}:LogOutModalProps) => {
    return ( 
        <div className="h-[100vh] flex items-center justify-center w-[100vw] absolute bg-[rgba(0,0,0,0.4)] backdrop-blur-[2px]">
          <div className=" top-[-2rem] relative h-[15%] flex flex-col gap-[10%] w-[25%] bg-black border-[1px] border-gray-700 border-solid rounded-2xl">
            <div className="h-[20%] flex items-center justify-center pt-[0.4rem]">
              <div className="text-[1rem] text-white">Are you sure you want logout</div>
              <RxCross2
                className="text-white text-[1.4rem] relative left-[4rem] top-[0.2rem] cursor-pointer hover:text-green-500"
                onClick={() => {
                  setLogout(false);
                }}
              />
            </div>

            <div className="h-[70%] flex items-center gap-[10%] justify-center">
              <div
                className="h-[50%] w-[40%] cursor-pointer hover:bg-red-700 bg-red-500  text-[1.5rem] flex items-center justify-center rounded-sm text-white"
                onClick={HandleLogOut}
              >
                Yes
              </div>
              <div
                className="h-[50%] w-[40%]  cursor-pointer hover:bg-gray-400 bg-white text-[1.5rem] flex items-center justify-center rounded-sm text-black"
                onClick={() => {
                  setLogout(false);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default LogOut;