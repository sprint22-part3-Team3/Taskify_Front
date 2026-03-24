function fieldWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full flex-col gap-2">{children}</div>;
}

export default fieldWrapper;
