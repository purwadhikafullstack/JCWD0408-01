'use client'
import { Field } from 'formik';
import Image from 'next/image';
import React from 'react';
import { IoCloseOutline } from "react-icons/io5";


interface ImagePreviwProps {
    image?: File | null;
    setFieldValue: (Field: string, value: any, shouldValidate?: boolean) => void;
    mediaRef: React.RefObject<HTMLInputElement>;
}

const ImagePreview: React.FC<ImagePreviwProps> = ({ image, setFieldValue, mediaRef }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    console.log(image);
    

    const onRemove = () => {
        setFieldValue('media', null)
        if (mediaRef.current) {
            mediaRef.current.value = ''
        }
    }

    React.useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImageUrl(null);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImageUrl(null);
        }
    }, [image]);

    if (!imageUrl) {
        return null;
    }

    return (
        <div>
            <Image 
            src={imageUrl} 
            alt='Preview' 
            width={100} 
            height={100}
            style={{maxWidth: '300px', maxHeight:'200px', objectFit:'cover'}}
            />
            {/* <button
            onClick={onRemove}
            className='absolute top-2 right-2 bg-third'
            >
                <IoCloseOutline />
            </button> */}
        </div>
    )
}

export default ImagePreview