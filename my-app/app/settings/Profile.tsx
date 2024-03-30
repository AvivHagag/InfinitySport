"use client";
import { Button } from "@/src/components/ui/button";
import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import { Session } from "next-auth";
import { useState } from "react";
import Image from "next/image";
import {
  CheckCircleIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Zoom } from "react-awesome-reveal";

interface ProfileProps {
  session: Session;
}
const Profile: React.FC<ProfileProps> = ({ session }) => {
  const [name, setName] = useState<string | null>(session.user.name);
  const [ErrorName, setErrorName] = useState<boolean>(false);
  const [uploadSuccessful, setuploadSuccessful] = useState<boolean>(false);
  const [EditImage, setEditImage] = useState<boolean>(false);
  const [ErrorImage, setErrorImage] = useState<boolean>(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    session.user.image
  );
  const handleEditImage = () => {
    setEditImage(!EditImage);
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreviewUrl(e.target.value);
  };
  return (
    <>
      {!uploadSuccessful ? (
        <>
          <div className="flex flex-col">
            {session.user.image && !EditImage ? (
              <>
                <div className="flex flex-col items-center justify-center w-full py-4">
                  <h1 className="text-center text-xl sm:text-2xl">Profile</h1>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <>
                    <div className="flex-shrink-0 relative">
                      <Image
                        src={imagePreviewUrl || session.user.image}
                        height={100}
                        width={100}
                        alt={`${session.user.name}'s picture`}
                        className="rounded-full border border-black dark:border-gray-600 shadow-lg dark:shadow-gray-700"
                      />
                      <div className="absolute bottom-0 right-0 text-white bg-gray-500 opacity-85 dark:opacity-75 rounded-full p-1 cursor-pointer">
                        <PencilIcon
                          className="h-6 w-6 text-white"
                          onClick={handleEditImage}
                        />
                      </div>
                    </div>
                  </>
                </div>
                <div className="text-center text-naivyBlue dark:text-glowGreen">
                  {session.user.name}
                </div>
              </>
            ) : (
              <Zoom>
                <div className="flex flex-col w-full sm:w-4/5 mx-auto">
                  <div className="flex justify-between pb-2">
                    <div className="text-base sm:text-xl text-naivyBlue dark:text-glowGreen">
                      Edit Profile{" "}
                    </div>
                    <XMarkIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={handleEditImage}
                    />
                  </div>
                  <Label className="text-base text-naivyBlue dark:text-glowGreen">
                    Image Url
                  </Label>
                  <Input
                    id="image"
                    type="text"
                    name="image"
                    value={imagePreviewUrl || ""}
                    // onChange={handleChange}
                  />
                  {ErrorImage ? (
                    <p className="text-sm text-red-600">
                      Insert currect image URL
                    </p>
                  ) : null}
                  <Label className="text-base text-naivyBlue dark:text-glowGreen">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={name || ""}
                    // onChange={handleChange}
                  />
                  {ErrorName ? (
                    <p className="text-sm text-red-600">Insert currect name</p>
                  ) : null}
                  <div className="flex flex-col items-center justify-center mt-8 text-naivyBlue dark:text-glowGreen">
                    <Button variant={"outline"}>Save Changes</Button>
                  </div>
                </div>
              </Zoom>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center">
          <p className="text-lg font-bold px-4 text-center">
            Edit Successful !
          </p>
          <CheckIcon className="h-4 w-4 mx-2" />
        </div>
      )}
    </>
  );
};
export default Profile;
