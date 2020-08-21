//Standard Modules
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

//UI Components
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

//Components
import AdminLayout from "../../components/Layout";
import CustomAlert from "../../components/Alert";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { productActions, categoryActions, brandActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  bottomAppbar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "white",
  },
  richEditor: {
    height: "50vh",
    border: "1px solid #ddd",
    backgroundColor: "white",
  },
  sectionBtn: {
    width: "100%",
    padding: theme.spacing(1),
    borderTop: `5px solid ${theme.palette.primary.main}`,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
  },
  uploadRoot: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ddd",
  },
  productSection: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

//Options
const statusOption = [
  { title: "Available", value: true },
  { title: "Unavailable", value: false },
];

export default function ProductEdit(props) {
  const classes = useStyles();

  //Redux Hooks
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);

  //>>Load all categories
  useEffect(() => {
    dispatch(categoryActions.getAll());
    dispatch(brandActions.getAll());
  }, [dispatch]);
  //>>Load Product Edit
  useEffect(() => {
    dispatch(productActions.getById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  //Colapse
  const [openProductInfoCollapse, setOpenProductInfoCollapse] = useState(true);
  const handleProductInfoCollapse = () => {
    setOpenProductInfoCollapse(!openProductInfoCollapse);
  };

  const [openSEOCollapse, setOpenSEOCollapse] = useState(false);
  const handleSEOCollapse = () => {
    setOpenSEOCollapse(!openSEOCollapse);
  };

  //Image
  //const [oldImage, setOldImage] = React.useState([{ images: [] }]);
  const [image, setImage] = React.useState([]);
  const [delImage, setDelImage] = React.useState([]);

  const handleOnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let images = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push({ id: i, img: event.target.files[i] });
      }
      setImage(images);
    }
  };

  const onDeleteNew = (e) => {
    let newImg = image.filter((_image) => image.id !== e.target.id * 1);
    setImage(newImg);
  };

  const onDeleteBtn = (e) => {
    setDelImage([...delImage, e.target.id * 1]);
    setFormData({
      ...formData,
      images: formData.images.filter((_image) => _image.id !== e.target.id * 1),
    });
  };

  //Main funtion
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    price: 0,
    battery_capacity: "",
    bluetooth: "",
    camera: "",
    cpu: "",
    discount: "",
    display: "",
    display_resolution: "",
    display_screen: "",
    gpu: "",
    material: "",
    new_feature: "",
    os: "",
    ports: "",
    ram: "",
    size: "",
    storage: "",
    video: "",
    weight: "",
    wifi: "",
    brand_id: 1,
    category_id: 1,
    description: "",
    is_available: true,
    images: [],
  });

  const {
    sku,
    name,
    price,
    battery_capacity,
    bluetooth,
    camera,
    cpu,
    discount,
    display,
    display_resolution,
    display_screen,
    gpu,
    material,
    new_feature,
    os,
    ports,
    ram,
    size,
    storage,
    video,
    weight,
    wifi,
    description,
  } = formData;

  //>>Put item to form data
  useEffect(() => {
    setFormData({ ...products.item });
  }, [products.item]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    dispatch(
      productActions.update(props.match.params.id, formData, image, delImage)
    );
  };

  const keyPressed = (e) => {
    if (e.key === "Enter") onSubmit(e);
  };

  return (
    <AdminLayout>
      <React.Fragment>
        {/* Breadcrumb */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link className={classes.link} to="/">
            Dashboard
          </Link>
          <Link className={classes.link} to="/products">
            Product List
          </Link>
          <Typography color="textPrimary">Product Edit</Typography>
        </Breadcrumbs>

        {/* Success & Error handling */}
        {
          <CustomAlert
            loading={products.loading || brands.loading || categories.loading}
          />
        }
        {products.error && (
          <CustomAlert
            openError={true}
            messageError={products.error}
          ></CustomAlert>
        )}
        {products.success && <CustomAlert openSuccess={true}></CustomAlert>}

        {/* Main */}
        <Grid container direction="column" spacing={3}>
          {/* Product info */}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleProductInfoCollapse}
            >
              <Typography variant="h6">Product Info</Typography>
              {openProductInfoCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openProductInfoCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* images */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      justify="center"
                    >
                      <Grid item>
                        <div className={classes.uploadRoot}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleOnImageChange}
                          />

                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="secondary"
                              component="span"
                            >
                              Upload Images
                            </Button>
                          </label>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className={classes.gridListRoot}>
                          <GridList className={classes.gridList} cols={3.5}>
                            {/* Old Images */}
                            {formData.images &&
                              formData.images.map((item, index) => (
                                <GridListTile key={index}>
                                  <img src={item.url} alt={"No data"} />
                                  <GridListTileBar
                                    title={item.id}
                                    actionIcon={
                                      <Button
                                        id={item.id}
                                        style={{ color: "red" }}
                                        onClick={(e) => onDeleteBtn(e)}
                                      >
                                        <Typography id={item.id}>
                                          Del
                                        </Typography>
                                      </Button>
                                    }
                                  />
                                </GridListTile>
                              ))}
                            {/* New Images */}
                            {image &&
                              image.map((item) => (
                                <GridListTile key={item.id}>
                                  <img
                                    src={URL.createObjectURL(item.img)}
                                    alt={"No data"}
                                  />
                                  <GridListTileBar
                                    title={item.img.name}
                                    actionIcon={
                                      <Button
                                        id={item.id}
                                        style={{ color: "red" }}
                                        onClick={(e) => onDeleteNew(e)}
                                      >
                                        <Typography id={item.id}>
                                          Del
                                        </Typography>
                                      </Button>
                                    }
                                  />
                                </GridListTile>
                              ))}
                          </GridList>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* General */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      General
                    </Typography>
                  </Grid>
                  {/* sku */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="sku-text"
                      fullWidth
                      label="SKU"
                      variant="outlined"
                      value={sku || ""}
                      name="sku"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* name */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="name-text"
                      fullWidth
                      required
                      label="Product Name"
                      variant="outlined"
                      value={name || ""}
                      name="name"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* category */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Autocomplete
                      id="combo-box-category"
                      fullWidth
                      options={categories.items}
                      value={
                        categories.items.find(
                          (element) => element.id === formData.category_id
                        ) || null
                      }
                      onChange={(e, newValue) =>
                        setFormData({
                          ...formData,
                          category_id: newValue.id,
                        })
                      }
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Category"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  {/* brand */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Autocomplete
                      id="combo-box-brand"
                      fullWidth
                      options={brands.items}
                      value={
                        brands.items.find(
                          (element) => element.id === formData.brand_id
                        ) || null
                      }
                      onChange={(e, newValue) =>
                        setFormData({
                          ...formData,
                          brand_id: newValue.id,
                        })
                      }
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Brand"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  {/* price & discount */}
                  <Grid item container xs={12} sm={12} md={9} spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="price-text"
                        type="number"
                        fullWidth
                        label="Price"
                        variant="outlined"
                        value={price || 0}
                        name="price"
                        onChange={(e) => onChange(e)}
                        onKeyPress={(e) => keyPressed(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="discount-text"
                        type="number"
                        fullWidth
                        label="Discount"
                        variant="outlined"
                        value={discount || 0}
                        name="discount"
                        onChange={(e) => onChange(e)}
                        onKeyPress={(e) => keyPressed(e)}
                      />
                    </Grid>
                  </Grid>
                  {/* available */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Autocomplete
                      id="combo-box-active"
                      fullWidth
                      options={statusOption}
                      value={
                        formData.is_available
                          ? statusOption[0]
                          : statusOption[1]
                      }
                      onChange={(e, newValue) =>
                        setFormData({
                          ...formData,
                          is_available: newValue.value,
                        })
                      }
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Active"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  {/* description */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="description-text"
                      fullWidth
                      label="Description"
                      variant="outlined"
                      value={description || ""}
                      name="description"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Configurations */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      Configurations
                    </Typography>
                  </Grid>
                  {/* CPU */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="cpu-text"
                      fullWidth
                      label="CPU"
                      variant="outlined"
                      value={cpu || ""}
                      name="cpu"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* GPU */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="gpu-text"
                      fullWidth
                      label="GPU"
                      variant="outlined"
                      value={gpu || ""}
                      name="gpu"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* OS */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="os-text"
                      fullWidth
                      label="OS"
                      variant="outlined"
                      value={os || ""}
                      name="os"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* RAM */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="ram-text"
                      fullWidth
                      label="RAM"
                      variant="outlined"
                      value={ram || ""}
                      name="ram"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Storage */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="storage-text"
                      fullWidth
                      label="Storage"
                      variant="outlined"
                      value={storage || ""}
                      name="storage"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* New Feature */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="new-feature-text"
                      fullWidth
                      label="New Feature"
                      variant="outlined"
                      value={new_feature || ""}
                      name="new_feature"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Display */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      Display
                    </Typography>
                  </Grid>
                  {/* Display */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="display-text"
                      fullWidth
                      label="Display"
                      variant="outlined"
                      value={display || ""}
                      name="display"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Display Resolution */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="display-text"
                      fullWidth
                      label="Display Resolution"
                      variant="outlined"
                      value={display_resolution || ""}
                      name="display_resolution"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Display Screen*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="display-text"
                      fullWidth
                      label="Display Screen"
                      variant="outlined"
                      value={display_screen || ""}
                      name="display_screen"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Camera */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      Camera
                    </Typography>
                  </Grid>
                  {/* Camera*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="camera-text"
                      fullWidth
                      label="Camera"
                      variant="outlined"
                      value={camera || ""}
                      name="camera"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Video*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="video-text"
                      fullWidth
                      label="Video"
                      variant="outlined"
                      value={video || ""}
                      name="video"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Connectivity */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      Connectivity
                    </Typography>
                  </Grid>
                  {/* Wifi*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="wifi-text"
                      fullWidth
                      label="Wifi"
                      variant="outlined"
                      value={wifi || ""}
                      name="wifi"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Bluetooth*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="bluetooth-text"
                      fullWidth
                      label="Bluetooth"
                      variant="outlined"
                      value={bluetooth || ""}
                      name="bluetooth"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Ports*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="ports-text"
                      fullWidth
                      label="Ports"
                      variant="outlined"
                      value={ports || ""}
                      name="ports"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Physical details */}
                  <Grid item xs={12} sm={12} md={9}>
                    <Typography
                      className={classes.productSection}
                      align="center"
                      variant="h6"
                    >
                      Physical details
                    </Typography>
                  </Grid>
                  {/* Size*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="size-text"
                      fullWidth
                      label="Size"
                      variant="outlined"
                      value={size || ""}
                      name="size"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Weight*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="weight-text"
                      fullWidth
                      label="Weight"
                      variant="outlined"
                      value={weight || ""}
                      name="weight"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Material*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="material-text"
                      fullWidth
                      label="Material"
                      variant="outlined"
                      value={material || ""}
                      name="material"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                  {/* Battery capacity*/}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="battery_capacity-text"
                      fullWidth
                      label="Battery Capacity"
                      variant="outlined"
                      value={battery_capacity || ""}
                      name="battery_capacity"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          {/* SEO info*/}
          <Grid item>
            <ButtonBase
              className={classes.sectionBtn}
              onClick={handleSEOCollapse}
            >
              <Typography variant="h6">SEO</Typography>
              {openSEOCollapse ? <ExpandLess /> : <ExpandMore />}
            </ButtonBase>
            <Collapse in={openSEOCollapse} timeout="auto" unmountOnExit>
              <Paper className={classes.padding} elevation={4}>
                <Grid container spacing={2} justify="center">
                  {/* slug */}
                  <Grid item xs={12} sm={12} md={9}>
                    {/* <TextField
                      id="slug-text"
                      fullWidth
                      label="Search engine friendly page name (slug)"
                      variant="outlined"
                      value={slug}
                      name="slug"
                      onChange={(e) => onChange(e)}
                      onKeyPress={(e) => keyPressed(e)}
                    /> */}
                  </Grid>
                  {/* meta title */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-title-text"
                      fullWidth
                      label="Product Name"
                      variant="outlined"
                    />
                  </Grid>
                  {/* meta keywords */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-keyword-text"
                      fullWidth
                      label="Short Description"
                      variant="outlined"
                    />
                  </Grid>
                  {/* meta description */}
                  <Grid item xs={12} sm={12} md={9}>
                    <TextField
                      id="meta-description-text"
                      fullWidth
                      label="Meta Description"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>
        </Grid>

        {/* White space for bottom appbar */}
        <div style={{ height: "128px" }} />

        {/* Bottom Appbar for buttons */}
        <AppBar position="fixed" className={classes.bottomAppbar}>
          <Toolbar>
            <Grid container justify="center" spacing={5}>
              <Grid item>
                <Button
                  component={Link}
                  to="/products"
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={onSubmit} variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </AdminLayout>
  );
}
