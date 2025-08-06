function Cloud({ clouds = "clouds", index }) {
  return (
    <div className={`cloud cloud-${index}`}>
      {clouds ? (
        <img src="/img/002-clouds.png" alt="clouds" />
      ) : (
        <img src="/img/001-cloud.png" alt="cloud" />
      )}
    </div>
  );
}

export default Cloud;
