'use client'
import { Field } from 'formik';
import Image from 'next/image';
import React from 'react';
import { IoCloseOutline } from "react-icons/io5";


interface ImagePreviwProps {
    category_url?: File | null;
    setFieldValue: (Field: string, value: any, shouldValidate?: boolean) => void;
    mediaRef: React.RefObject<HTMLInputElement>;
}

const ImagePreviewCategory: React.FC<ImagePreviwProps> = ({ category_url, setFieldValue, mediaRef }) => {
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    console.log(category_url);
    

    const onRemove = () => {
        setFieldValue('media', null)
        if (mediaRef.current) {
            mediaRef.current.value = ''
        }
    }

    React.useEffect(() => {
        if (category_url) {
            const objectUrl = URL.createObjectURL(category_url);
            setImageUrl(null);

            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setImageUrl(null);
        }
    }, [category_url]);

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

export default ImagePreviewCategory