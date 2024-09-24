import './style.scss';

import { Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosSquare } from 'react-icons/io';

import {
  Consumer,
  ControlUp,
  Exchange,
  Producer,
  Prosumer,
  TS35,
  TS110,
  TS1004,
  TSGeneral
} from '../../../icons';

const { Text, Title } = Typography;

export const Legend = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState('none');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(contentRef.current?.scrollHeight + 'px');
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);
  const smallLegend = (
    <div className={'flex gap-4'}>
      <div className={'flex items-center justify-start gap-2'}>
        <div className="relative flex size-[25px] items-center justify-center">
          <IoIosSquare color={'skyblue'} size={25} />
        </div>
        <Text className={'text-white'}>Usage points</Text>
      </div>
      <div className={'flex items-center justify-start gap-2'}>
        <div className="relative flex size-[25px] items-center justify-center">
          <IoIosSquare color={'orange'} size={25} />
        </div>
        <Text className={'text-white'}>Transformer stations</Text>
      </div>
    </div>
  );
  const openLegendTitle = (
    <div className={'flex w-80 gap-4'}>
      <div className={'flex w-1/2 items-center justify-start gap-2'}>
        <Title className={'mt-4 block text-center !text-white'} level={4}>
          Usage points
        </Title>
      </div>
      <div className={'flex w-1/2 items-center justify-start  gap-2'}>
        <Title className={'mt-4 block text-center !text-white'} level={4}>
          Transformers
        </Title>
      </div>
    </div>
  );
  return (
    <div
      /* eslint-disable-next-line tailwindcss/no-custom-classname,tailwindcss/migration-from-tailwind-2 */
      className={`${isOpen ? 'p-4' : 'my-auto justify-center px-4 pt-4'} border-1 absolute bottom-16 right-7 z-20 flex w-96 flex-col gap-4 rounded-md border-solid border-white bg-black bg-opacity-60`}
    >
      <div className="flex justify-between">
        {isOpen ? (
          <div className={'flex items-center justify-center gap-2'}>
            {openLegendTitle}
            <IoIosArrowDown
              className="cursor-pointer text-white"
              size={24}
              onClick={toggleOpen}
            />
          </div>
        ) : (
          <>
            {smallLegend}
            <IoIosArrowUp
              className="cursor-pointer text-white"
              size={24}
              onClick={toggleOpen}
            />
          </>
        )}
      </div>

      <div
        /* eslint-disable-next-line tailwindcss/no-custom-classname */
        className="transition-height"
        ref={contentRef}
        style={{ maxHeight: maxHeight, opacity: isOpen ? 1 : 0 }}
      >
        <div className={'flex items-start gap-4'}>
          <div className={'w-1/2'}>
            <div className={'flex items-center justify-start gap-2 text-white'}>
              <div className="relative">
                <svg
                  fill="skyblue"
                  height="25px"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z"
                    fillRule="evenodd"
                  />
                  <circle cx="16" cy="12" fill="white" r="8" />
                </svg>
              </div>
              <Text className={'text-white'}>Location</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <div className="top-[10px] flex size-[25px] items-center justify-center rounded-full border-4 border-solid border-[skyblue] bg-white text-[8px] font-semibold text-[skyblue]"></div>
              </div>
              <Text className={'text-white'}>Cluster</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <Consumer color={'#ADD8E6FF'} size={20} />
              </div>
              <Text className={'text-white'}>Consumer</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <Producer color={'#4682B4'} size={20} />
              </div>
              <Text className={'text-white'}>Producer</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <Prosumer color={'#00CED1'} size={20} />
              </div>
              <Text className={'text-white'}>Prosumer</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <ControlUp color={'#7B68EE'} size={20} />
              </div>
              <Text className={'text-white'}>Control</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <Exchange color={'#008080'} size={20} />
              </div>
              <Text className={'text-white'}>Exchange</Text>
            </div>
          </div>
          <div className={'w-1/2'}>
            <div className={'flex items-center justify-start gap-2 text-white'}>
              <div className="relative">
                <svg
                  fill="orange"
                  height="25px"
                  version="1.1"
                  viewBox="0 0 32 32"
                  width="25px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016q0 1.376-0.672 3.2t-1.696 3.68-2.336 3.776-2.56 3.584-2.336 2.944-1.728 2.080l-0.672 0.736q-0.256-0.256-0.672-0.768t-1.696-2.016-2.368-3.008-2.528-3.52-2.368-3.84-1.696-3.616-0.672-3.232zM8 12q0 3.328 2.336 5.664t5.664 2.336 5.664-2.336 2.336-5.664-2.336-5.632-5.664-2.368-5.664 2.368-2.336 5.632z"
                    fillRule="evenodd"
                  />
                  <circle cx="16" cy="12" fill="white" r="8" />
                </svg>
              </div>
              <Text className={'text-white'}>Location</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <div className="top-[10px] flex size-[25px] items-center justify-center rounded-full border-4 border-solid border-[orange] bg-white text-[8px] font-semibold text-[skyblue]"></div>
              </div>
              <Text className={'text-white'}>Cluster</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <TS35 color={'#FFD700'} size={20} />
              </div>
              <Text className={'text-white'}>35kV</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <TS1004 color={'#FF8C00'} size={20} />
              </div>
              <Text className={'text-white'}>10kV/0.4kV</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <TS110 color={'#FF4500'} size={20} />
              </div>
              <Text className={'text-white'}>110kV</Text>
            </div>
            <div className={'flex items-center justify-start gap-2'}>
              <div className="relative flex size-[25px] items-center justify-center">
                <TSGeneral color={'#FFD700'} size={20} />
              </div>
              <Text className={'text-white'}>Unspecified</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
