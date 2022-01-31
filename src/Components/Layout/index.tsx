type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="flex md:flex-row-reverse flex-wrap">{children}</div>
    </div>
  );
}

export function Container({ children }: Props) {
  return (
    <div className="w-full md:w-4/5 bg-gray-100">
      <div className="container bg-gray-100 pt-2 px-6 text-center">
        {children}
      </div>
    </div>
  );
}
