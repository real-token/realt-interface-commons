import { FC } from 'react';

type HeadProps = {
  title: string;
  description: string;
};

export const Head: FC<HeadProps> = ({ title, description }) => {
  return (
      <>
        <title>{title}</title>
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1.0'}
        />
        <meta
          name={'Description'}
          content={description}
        />
      </>
  );
};
