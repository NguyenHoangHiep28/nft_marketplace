import { useRouter } from 'next/router';
import React from 'react';
import { getAllCollectionInCategory } from 'services/collectionService';
import useSWR from 'swr';

const ListCollectionCategory = ({ collections }) => {
  return (
    <>
      <div className="category-collection-container">
        <div className="banner w-full mb-10">
          <img
            src="https://i.seadn.io/gae/g6IAEmQm0J8J2ZoG0wLS04HEkVC7OvxNON5TvBZ4UR0Jm6LfIH4QwJNLWSnJsnabTnvarLUhpfRw_l-lMSBu6R0ymspZXNnT11YtXw?auto=format&w=3840"
            alt="banner"
          />
        </div>

        <div className="description w-[95%] mx-auto mb-10">
          <h1 className="text-4xl font-semibold">
            Explore {collections[0].category.categoryName}
          </h1>
          <p className="text-base font-normal">
            <span>{collections[0].category.categoryName}</span> are taking the
            NFT world by storm, and we've got a selection of breathtaking
            collections from a growing and increasingly global community of
            creators right here on underground.
          </p>
        </div>

        <div className="collection w-[95%] mx-auto">
          <h3 className="text-2xl">Collections</h3>
          <div className="collection-list my-6">
            {collections &&
              collections.map((col) => (
                <div className="collection-item w-[450px] shadow-md rounded-lg overflow-hidden relative cursor-pointer ">
                  <div className="collection-item-img z-10">
                    <img
                      src={col.featuredImage}
                      alt="alt"
                      className="w-full object-cover h-[300px]"
                    />
                  </div>
                  <div className="sub-img p-2 shadow-lg rounded-lg overflow-hidden z-[50] absolute bottom-9 left-5 bg-slate-100">
                    <img
                      src={col.logoImage}
                      alt="sub-alt"
                      className="w-[70px] h-[70px] object-cover rounded-lg "
                    />
                  </div>
                  <div className="collection-text p-4 ">
                    <h2 className="text-center">{col.collectionName}</h2>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { categoryId } = context.query;
  const data = await getAllCollectionInCategory(categoryId);
  return {
    props: {
      collections: data,
    },
  };
}

export default ListCollectionCategory;
