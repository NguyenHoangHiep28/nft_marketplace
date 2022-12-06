import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../UploadItemPage/UploadItem.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import images from "../img";
import  Button  from "../components/Button/Button";
import { DropZone } from "../UploadItemPage/uploadItemIndex";
import { useForm } from "react-hook-form";
import Input from "../CreateNftItem/FormControll/input";
import TextArea from "../CreateNftItem/FormControll/TextArea/TextArea";
import InputWithIcon from "../CreateNftItem/FormControll/InputWithIcon/inputIcon";
import axiosClient from "../utils/axiosClient";
import collection from "pages/collection";

const UploadItem = () => {
  const [active, setActive] = useState(0);
  const [name, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [collectionUI, setcollectionUI] = useState(null);
  const [image, setImage] = useState(null);

  const [collectionID, setCollectionID] = useState(null);
  const [fetchCollection,setFetchCollection] = useState(null);

console.log(collectionID)
    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = async (data) => {

    if(!image & !collectionUI) {
      alert("Please upload image and choose collection")
      return
    }

    const { itemName, price, description } = data;

    try {
      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("collectionId", collectionID);
      formData.append("mediaFile", image);

      const respone = await axiosClient.post(`/item`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const categoryArry = [
  //   {
  //     id: 1,
  //     image: images.nft_image_1,
  //     category: "Sports",
  //   },
  //   {
  //     id: 2,
  //     image: images.nft_image_2,
  //     category: "Arts",
  //   },
  //   {
  //     id: 3,
  //     image: images.nft_image_3,
  //     category: "Music",
  //   },
  //   {
  //     id: 4,
  //     image: images.nft_image_1,
  //     category: "Digital",
  //   },
  //   {
  //     id: 5,
  //     image: images.nft_image_2,
  //     category: "Time",
  //   },
  //   {
  //     id: 6,
  //     image: images.nft_image_3,
  //     category: "Photography",
  //   },
  // ];

  const getAllCollections = async () => {
    try {
      const respone = await axiosClient.get(`/collection/personal`)
      const {body : data} = respone.data;
      console.log(data);
      setFetchCollection(data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllCollections();
  },[])

  return (
    <div className={Style.upload}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          heading="Drag & drop file"
          subHeading="or Browse media on your device"
          itemName={name}
          description={description}
          price={price}
          collection={collectionUI}
          image={images.upload}
          register={register}
          label="Item Image"
          errors={errors}
          setImage={setImage}
        />
        <div className={Style.upload_box}>
          <Input
            label="itemName"
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Treasure"
            register={register}
            type="text"
            errors={errors}
          />
          <TextArea
            label="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Something about your NFt"
            register={register}
            errors={errors}
          />

          <div className={formStyle.Form_box_input}>
            <label htmlFor="name">Choose collection</label>
            <p className={Style.upload_box_input_para}>
              Choose an exiting collection or create a new one
            </p>

            <div className={Style.upload_box_slider_div}>
              {fetchCollection?.map((el, i) => (
                <div
                  className={`${Style.upload_box_slider} ${
                    active == i + 1 ? Style.active : ""
                  }`}
                  key={i + 1}
                  onClick={() => (
                    setActive(i + 1),
                    setcollectionUI(el.category.categoryName),
                    setCollectionID(el.collectionId)  
                  )}
                >
                  <div className={Style.upload_box_slider_box}>
                    <div className={Style.upload_box_slider_box_img}>
                      <img
                        width="50px"
                        height = "50px"
                        src={el.logoImage}
                        alt= {el.collectionName}
                        className={Style.upload_box_slider_box_img_img}
                      />
                    </div>
                    <div className={Style.upload_box_slider_box_img_icon}>
                      <TiTick />
                    </div>
                  </div>
                  <p className="mt-3 fs-6 text-capitalize">{el.collectionName}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={formStyle.Form_box_input_social}>
            <InputWithIcon
              label="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Treasure"
              register={register}
              type="text"
              errors={errors}
            />
          </div>

          <div className={Style.upload_box_btn}>
            <Button
              btnName="Upload"
              handleClick={() => handleSubmit(onSubmit)}
              classStyle={Style.upload_box_btn_style}
            />
            <Button
              btnName="Preview"
              handleClick={() => {}}
              classStyle={Style.upload_box_btn_style}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadItem;