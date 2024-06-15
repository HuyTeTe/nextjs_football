import React from 'react'
import styles from '../../styles/profile/profile.module.scss';
import Tabs from './Tabs';

function ProfileBody() {
  return (
    <div className={styles['profile-body-container']}>
        <Tabs />
    </div>
  )
}

export default ProfileBody