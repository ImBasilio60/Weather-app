function Cloud({ clouds = "clouds", index }) {
  return (
    <div className={`cloud cloud-${index}`}>
      {clouds ? (
        <img
          src="https://raw.githubusercontent.com/ImBasilio60/Weather-app/refs/heads/master/public/img/002-clouds.png"
          alt="clouds"
        />
      ) : (
        <img
          src="https://raw.githubusercontent.com/ImBasilio60/Weather-app/refs/heads/master/public/img/001-cloud.png"
          alt="cloud"
        />
      )}
    </div>
  );
}

export default Cloud;
