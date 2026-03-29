import type { Dispatch, SetStateAction } from 'react';

export type TagInputProps = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  maxTags?: number;
  placeholder?: string;
};
