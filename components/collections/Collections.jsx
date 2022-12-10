import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getTopTenCollectionLatest } from 'services/collectionService';
import { getTopTenItemLatest } from 'services/itemService';
import { v4 as uuidv4 } from 'uuid';

const CollectionStyles = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-bottom: 3rem;
  .tab-list .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: white;
    background-color: rgb(14 165 233);
  }

  .tab-list .css-1aquho2-MuiTabs-indicator {
    display: none;
  }

  .tab-list .css-1h9z7r5-MuiButtonBase-root-MuiTab-root {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Popins', sans-serif;
  }

  .tab-list .css-1gsv261 {
    border: unset;
  }

  .css-heg063-MuiTabs-flexContainer {
    align-items: center;
  }
  .css-1daeahq {
    border-bottom: unset;
  }
`;

const Collections = () => {
  const [value, setValue] = React.useState('collections');
  const [filter, setFilter] = useState('DESC');
  const [data, setData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 'collections') {
      getTopTenCollectionLatest(filter).then((data) => {
        setData(data);
      });
    } else if (value === 'items') {
      getTopTenItemLatest(filter).then((data) => {
        setData(data);
      });
    }
  }, [value, filter]);

  console.log(data);

  return (
    <>
      <CollectionStyles>
        <h2 className="text-4xl text-center">Collections</h2>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 'unset',
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            className=""
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="tab-list"
            >
              <Tab label="Collections" value="collections" />
              <Tab label="Items" value="items" />
            </TabList>
            <div className="collections-filter text-base">
              <select
                name="sort"
                id="sort"
                className="cursor-pointer"
                defaultValue={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="DESC">Top</option>
                <option value="ASC">Cheapest</option>
              </select>
            </div>
          </Box>
          <div className="h-[1px] bg-gray-200 mt-2"></div>
          <TabPanel value="collections">
            {data.length > 0 ? (
              <ListCollection data={data}></ListCollection>
            ) : (
              <>
                <ListCollectionSkeleton></ListCollectionSkeleton>
              </>
            )}
          </TabPanel>
          <TabPanel value="items">
            {data.length > 0 ? (
              <ListItem data={data}></ListItem>
            ) : (
              <>
                <ListCollectionSkeleton></ListCollectionSkeleton>
              </>
            )}
          </TabPanel>
        </TabContext>
      </CollectionStyles>
    </>
  );
};

const ListCollection = React.memo(({ data }) => {
  return (
    <>
      <div className="list-collection-container flex items-center justify-between ">
        <div className="list-collection-left w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Collection</p>
            <p className="capitalize">Total</p>
          </div>
          {data.length > 0 &&
            data.slice(0, 5).map((collection, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>{index + 1}</p>
                  <img
                    src={collection.featuredImage}
                    alt="collection-img"
                    className="w-[60px] h-[60px] object-cover rounded-md"
                  />
                  <p>{collection.collectionName}</p>
                </div>
                <p>{collection.totalValue || 1}</p>
              </div>
            ))}
        </div>

        <div className="list-collection-right w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Collection</p>
            <p className="capitalize">Total</p>
          </div>

          {Array(2)
            .fill(0)
            .map((collection, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>1</p>
                  <img
                    src="https://i.seadn.io/gcs/files/a722300d6a86d74b7affa478af46dcf2.png?auto=format&w=3840"
                    alt="collection-img"
                    className="w-[60px] h-[60px]"
                  />
                  <p>Pointers by Steve Pikelny</p>
                </div>
                <p>2.10</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
});

const ListItem = React.memo(({ data }) => {
  return (
    <>
      <div className="list-collection-container flex items-center justify-between ">
        <div className="list-collection-left w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Collection</p>
            <p className="capitalize">Total</p>
          </div>
          {data.length > 0 &&
            data.slice(0, 5).map((collection, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>{index + 1}</p>
                  <img
                    src={collection.featuredImage}
                    alt="collection-img"
                    className="w-[60px] h-[60px] object-cover rounded-md"
                  />
                  <p>{collection.collectionName}</p>
                </div>
                <p>{collection.totalValue || 1}</p>
              </div>
            ))}
        </div>

        <div className="list-collection-right w-[45%]">
          <div className="list-collection-header flex justify-between mb-3">
            <p className="capitalize">Collection</p>
            <p className="capitalize">Total</p>
          </div>

          {Array(2)
            .fill(0)
            .map((collection, index) => (
              <div
                className="list-collection-item w-full flex items-center justify-between mb-4 cursor-pointer hover:bg-slate-100 p-2"
                key={uuidv4()}
              >
                <div className="flex-1 flex items-center gap-x-8">
                  <p>1</p>
                  <img
                    src="https://i.seadn.io/gcs/files/a722300d6a86d74b7affa478af46dcf2.png?auto=format&w=3840"
                    alt="collection-img"
                    className="w-[60px] h-[60px]"
                  />
                  <p>Pointers by Steve Pikelny</p>
                </div>
                <p>2.10</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
});

const ListCollectionSkeleton = () => {
  return <></>;
};

export default Collections;