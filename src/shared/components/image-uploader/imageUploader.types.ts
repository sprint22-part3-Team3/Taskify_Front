export type ChangeEvent<T = Element> = React.ChangeEvent<T>;

export type ImageUploadBoxProps = {
  variant?: 'default' | 'modal';
  initialImage?: string | null;
  onFileChange?: (file: File) => void;
};
