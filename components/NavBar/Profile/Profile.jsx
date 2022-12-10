import React from 'react';

import { FaUserAlt, FaRegImage } from 'react-icons/fa';

import Link from 'next/link';
import { motion } from 'framer-motion';

import Style from './Profile.module.scss';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { connectMetaMaskState } from '../../../global-state/connect-metamask';
import { modalNotifyMetaMask } from '../../../global-state/modal';
import axiosClient from 'utils/axiosClient';
import { TbDownload } from 'react-icons/tb';

const Profile = () => {
  const [metaMask, setMetaMask] = useRecoilState(connectMetaMaskState);
  const [metaModal, setMetaModal] = useRecoilState(modalNotifyMetaMask);

  const resetMetaMask = useResetRecoilState(connectMetaMaskState);

  const handleClickNotLogin = () => {
    if (!metaMask.accountCurrent) {
      return setMetaModal((prev) => {
        return { ...prev, open: true };
      });
    }
    return;
  };

  const handleLogout = async () => {
    const response = await axiosClient.get('/auth/logout');
    resetMetaMask();
  };

  return (
    <>
      <motion.div
        className={Style.profile}
        initial={{ y: '-15px', opacity: 0 }}
        animate={{ y: '4px', opacity: 1 }}
        exit={{ y: '-15px', opacity: 0 }}
        transition={{ duration: 0.2 }}
        type="spring"
      >
        <div className={Style.profile_menu}>
          <div className={Style.profile_menu_one}>
            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaUserAlt />
              <p>
                {metaMask.accountCurrent ? (
                  <Link href="/my-profile">My Profile</Link>
                ) : (
                  'My Profile'
                )}
              </p>
            </div>

            <div
              className={Style.profile_menu_one_item}
              onClick={handleClickNotLogin}
            >
              <FaRegImage />

              <p>
                {metaMask.accountCurrent ? (
                  <Link href={{ pathname: '/my-items' }}>My Items</Link>
                ) : (
                  'My Items'
                )}
              </p>
            </div>
          </div>

          {metaMask.accountCurrent ? (
            <div className={Style.profile_menu_two}>
              <div className={Style.profile_menu_one_item}>
                <TbDownload />
                <p>
                  <button
                    onClick={handleLogout}
                    href={{ pathname: '/disconnet' }}
                  >
                    Disconnet
                  </button>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
