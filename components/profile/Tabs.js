import styles from '../../styles/profile/tabs.module.scss';
import { useWindowSize } from '../utils/ScreenSize';
import { Popover, Button, Text } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { PROFILE_TABS, SCREEN_RESPONSIVE_ITEMS } from './object-provider/tabsProvider';

function Tabs() {
  const size = useWindowSize();

  return (
    SCREEN_RESPONSIVE_ITEMS.map((sizeObj) => {
      if (size.width >= sizeObj.sizeFrom && size.width <= sizeObj.sizeTo) {
        return <div> Test Data 1</div>;
        PROFILE_TABS.map((tabObj) => {

        })
      }
    })
    // size.width > 578 ? 
    // <span className={styles['tab-container']}>
    //     <a className={styles['sticky-selected']}>Left</a>
    //     <a>Middle</a>
    //     <a>Test1</a>
    //     <span>{size.width}px / {size.height}px</span>
    // </span>
    // :
    // <span className={styles['tab-container']}>
    //     <a className={styles['sticky-selected']}>Left</a>
    //     <a>Test1</a>
    //     <Popover disableAnimation>
    //       <Popover.Trigger>
    //         <Button animated={false} auto flat color="light">
    //           View More 
    //           <FontAwesomeIcon
    //             icon={faList}
    //             style={{ fontSize: 16, color: "black", marginLeft: 10 }}
    //           />
    //         </Button>
    //       </Popover.Trigger>
    //       <Popover.Content>
    //         <Text css={{ p: "$10" }}>This is the content of the popover. </Text>
    //       </Popover.Content>
    //     </Popover>
    // </span>
  )
}

export default Tabs