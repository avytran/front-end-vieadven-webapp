import React, { useState } from 'react';
import './ProfilePage.css';
import { Card } from '../../components/Card';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImageUploadController } from '../../components/ImageUploadController';
import { TextFieldController } from '../../components/TextFieldController';
import { Button } from '@mui/material';


export const ProfilePage = () => {
    

    return (
        <div className='profile-page-container'>
            <Information />
            <ChangePassword />
        </div>
    )
}

const Information = () => {
    const [preview, setPreview] = useState(null);
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        // resolver: yupResolver(personnelSchema),
        defaultValues: {
            "name": "",
            "avatar_url": "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        
    }
    return (
        <div className='profile-item-container'>
                <h2>Thông tin cá nhân</h2>
                <Card>
                    <div className='profile-container'>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <ImageUploadController
                                name="avatar_url"
                                control={control}
                                preview={preview}
                                setPreview={setPreview}
                                setValue={setValue}
                                errors={errors}
                            />
                            <TextFieldController
                                name="name"
                                control={control}
                                label="Họ và tên"
                                errors={errors}
                            />
                            <TextFieldController
                                name="Email"
                                control={control}
                                label="email"
                                errors={errors}
                                disabled
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Lưu
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
    )
}

const ChangePassword = () => { 

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            "password": "",
            "confirmed_password": "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        
    }
    return (
        <div className='profile-item-container'>
                <h2>Đổi mật khẩu</h2>
                <Card>
                    <div className='profile-container'>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <TextFieldController
                                name="old_password"
                                control={control}
                                label="Mật khẩu cũ"
                                errors={errors}
                            />
                            <TextFieldController
                                name="new_password"
                                control={control}
                                label="Mật khẩu mới"
                                errors={errors}
                            />
                            <TextFieldController
                                name="confirm_password"
                                control={control}
                                label="Xác nhận mật khẩu mới"
                                errors={errors}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Lưu
                            </Button>
                        </form>
                    </div>
                </Card>
            </div>
    )
}