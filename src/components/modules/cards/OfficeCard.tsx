"use client";

import React, { useState } from "react";
import BaseCard from "./BaseCard";
import LocationIcon from "@/components/icons/LocationIcon";
import RingingPhoneIcon from "@/components/icons/RingingPhoneIcon";
import Image from "next/image";

import PathLine from "@/components/elements/PathLine";

import MapContainer from "@/components/modules/map/MapContainer";
import Modal from "../modals/Modal";

type OfficeCardType = {
  title: string,
  address: string,
  numbers: string,
  longitude: number,
  latitude: number,
};

const OfficeCard = ({ title, address, numbers, longitude, latitude }: OfficeCardType) => {
  const [showModalAddress, setShowModalAddress] = useState(false);

  return (
    <>
      <BaseCard title={title}>
        <div className="flex justify-between gap-2">
          <div className="flex justify-between items-center flex-col w-1/2">
            <div className="flex justify-start items-start w-full gap-2">
              <span>
                <LocationIcon color={"fill-gray-500"} />{" "}
              </span>
              <p>{address}</p>
            </div>
            <div className="flex justify-start items-start w-full gap-2">
              <span>
                <RingingPhoneIcon color="fill-[#8E9190]" />
              </span>
              <p>{numbers}</p>
            </div>
          </div>
          <div className="flex justify-between items-end flex-col px-2 cursor-pointer w-1/2">
            <div
              onClick={() => setShowModalAddress(true)}
              className="w-full relative rounded-sm overflow-hidden"
            >
              <div className="absolute group  top-0 left-0 w-full h-full bg-black/50 text-white font-bold flex justify-center items-center text-md  z-[10] ">
                <span className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
                  مشاهده نقشه
                </span>
              </div>
              <MapContainer
                height={75}
                location={[latitude, longitude]}
                zoom={10}
                markerWidth={25}
              />
            </div>

            <a
              href={`geo:${latitude},${longitude}?q=${latitude},${longitude}`}
              type="button"
              className="text-lg font-bold text-link mx-auto mt-2 md:hidden"
            >
              مسیریابی روی نقشه
            </a>
            <button
              type="button"
              className="text-lg font-bold text-link mx-auto mt-2 hidden md:block"
              onClick={() =>
                window.open(
                  "https://maps.google.com?q=" + latitude + "," + longitude
                )
              }
            >
              مسیریابی روی نقشه
            </button>
          </div>
        </div>
      </BaseCard>

      <Modal show={showModalAddress} closeHandler={() => { }}>
        <div
          id="modal_address"
          className="container flex justify-center items-center h-[calc(100vh-4.375rem)] "
          onClick={(e) => {
            const target = e.target as HTMLDivElement

            if (target.id === "modal_address") setShowModalAddress(false);
          }}
        >
          <div className=" w-[43.75rem] max-w-full  bg-white p-5 rounded-sm shadow-shadow_category">
            <p className="text-center text-link font-bold">
              مسیر یابی روی نقشه
            </p>
            <div className="my-2">
              <PathLine color={"stroke-link"} />
            </div>
            <div className="w-full ">
              <MapContainer
                height={300}
                location={[latitude, longitude]}
                zoom={16}
                markerWidth={50}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OfficeCard;
