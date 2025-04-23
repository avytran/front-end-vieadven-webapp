import { Box, Typography, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { userImg } from "../../assets/images/profile";
import "./ImageUploadController.css"

export const ImageUploadController = ({ name, control, preview, setPreview, setValue }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <div className="image-upload-container">
                        <Box
                            className="image-upload-box"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <input

                                id="fileInput"
                                type="file"
                                accept="image/jpeg, image/png"
                                style={{ display: "none" }}
                                onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                        setPreview(file);
                                        setValue(name, URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {(preview || field.value)? (
                                <img 
                                    className="thumbnail-img"
                                    src={
                                        preview
                                          ? preview instanceof File
                                            ? URL.createObjectURL(preview)
                                            : preview
                                          : field.value
                                      }
                                    alt="Preview"
                                />
                            ) : (
                                <img src={userImg} alt="" />
                            )}
                        </Box>
                    <FormHelperText error>{fieldState.error?.message}</FormHelperText>
                    </div>
                </>
            )}
        />

    );
};