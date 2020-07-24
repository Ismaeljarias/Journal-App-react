import "@testing-library/jest-dom";
import cloudinary from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({
  cloud_name: process.env.REACT_APP_cloud_name,
  api_key: process.env.REACT_APP_cloudinary_api_key,
  api_secret: process.env.REACT_APP_cloudinary_api_secret,
});

describe("FileUpload Tests", () => {
  test("should upload a file and return an URL", async (done) => {
    const resp = await fetch(
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "pic.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    //Delete Image by ID

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test("should return an", async () => {
    const file = new File([], "pic.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
