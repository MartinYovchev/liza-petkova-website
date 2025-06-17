"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./ImageUploader.module.scss";

interface ImageUploaderProps {
  onImageUploaded: (imageId: string, imageUrl: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export default function ImageUploader({
  onImageUploaded,
  multiple = false,
  disabled = false,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const data = await response.json();
          onImageUploaded(data.id, data.url);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert("Failed to upload image. Please try again.");
        }
      }
    },
    [onImageUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    multiple,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <input {...getInputProps()} />
      <div className={styles.content}>
        <div className={styles.icon}>📁</div>
        <p className={styles.text}>
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop images here, or click to select"}
        </p>
        <p className={styles.hint}>
          Supports: PNG, JPG, JPEG, GIF, WEBP
          {multiple ? " (Multiple files allowed)" : ""}
        </p>
      </div>
    </div>
  );
}
