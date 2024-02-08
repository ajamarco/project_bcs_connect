//The generateReactHelpers function is used to generate the useUploadThing hook and the uploadFiles functions you use to interact with UploadThing in custom components. It takes the  File Router as a generic
import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
