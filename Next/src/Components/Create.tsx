import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/Components/ui/dialog";
import { ChangeEvent } from "react";
import { LuImage } from "react-icons/lu";
import { TbPhotoBolt, TbSquareRoundedPlus } from "react-icons/tb";

type CreateProps = {
    option_Name: string,
    ClickHandler: () => void,
    showIcon: boolean,
    id: string,
  }

  const fileUplaod = (e:ChangeEvent<HTMLInputElement>)=>{
    console.log(e.currentTarget.files);
  }

const Create = ({ option_Name, ClickHandler, showIcon, id }:CreateProps) => {
  return (
    <Dialog>

      <DialogTrigger  className="overflow-hidden relative navBlock hover:cursor-pointer
                    h-[2.8rem] w-[100%] rounded-lg flex items-center  gap-[0.8rem]  
                    hover:duration-300 hover:bg-[rgba(33,33,33,1.0)]">

            <div className="flex ml-[0.8rem] gap-[0.8rem]">
            
                <TbSquareRoundedPlus className="icon text-white text-[1.4rem] opacity-90 "/>
                {!showIcon && <span  id={id} className="text-white text-[1rem]">{option_Name}</span>}
            
            </div>

       </DialogTrigger>

      <DialogContent className="border-black text-white bg-[rgba(33,33,33,1.0)] h-[60vh] w-[30vw] rounded-2xl pt-[0.6rem]">

        <DialogHeader>
          <DialogTitle className="text-center text-[1.5rem] mb-[1.5rem]">Create a new Post</DialogTitle>
          
          <DialogDescription>

          <div className="flex items-center justify-center">
              <TbPhotoBolt className="relative left-[1rem] text-[3rem] text-white -rotate-6" />
              <LuImage className=" text-[3rem] text-white relative top-[1.2rem] bg-[rgba(33,33,33,1.0)]  rotate-6 " />
          </div>

          <div className="text-white relative top-[3rem] text-center text-[1.5rem] ">Drag photos and videos here</div>

          <label htmlFor="post" className="text-white  block relative top-[6rem] pl-[25%] pr-[25%] ">
              <div className=" hover:cursor-pointer bg-blue-500 text-white h-[2.5rem] w-[12rem] flex justify-center items-center rounded-lg ">
                Select from computer
              </div>
              {/* If i have created button instead of div then it won't work */}
          </label>
          <input type="file" multiple id="post" className="hidden" onChange={fileUplaod}></input>

          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  );
};

export default Create;
