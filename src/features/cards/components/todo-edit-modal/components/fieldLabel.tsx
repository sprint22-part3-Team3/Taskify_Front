function fieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="typo-md-regular md:typo-lg-regular text-black-200">
      {children}
      {required && (
        <>
          &nbsp;<span className="text-primary-500">*</span>
        </>
      )}
    </span>
  );
}

export default fieldLabel;
