import Image from 'react-bootstrap/Image';
import styles from '../../styles/profile/profile.module.scss';

function Avatar() {

  const image = '/profile/test.png';
  const backgroundImage = '/profile/footballYard.jpg';
  return (
    <div 
    className={styles['avatar-view-container']}
    // className='bg-secondary text-center position-relative' 
    style={{
        backgroundImage: `url(${backgroundImage})`
    }}>
        <div style={{ width: 150, height: 150, marginTop: 70 }}
            className="border border-5 border-success position-absolute bg-light rounded-circle">
            <Image style={{ width: 150 }} className=''
            src={image}
            roundedCircle
            />
        </div>
    </div>
  )
}

export default Avatar