export type ChangeEvent<T = Element> = React.ChangeEvent<T>;

export type ImageUploadBoxProps = {
  variant?: 'default' | 'modal';
  imageUrl?: string | null;
  onFileSelect?: (file: File) => void;
};
