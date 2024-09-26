import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Box } from "@mui/material";
import { getTags } from "../../../api/hackathons/hackathons";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

class TagSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      search: "",
      availableCategories: [],
      selectedCategories: [],
    };
  }

  componentDidMount() {
    // API call
    this.fetchCategories();
  }

  fetchCategories = () => {
    getTags().then((res) => this.setState({ availableCategories: res.data }));
  };

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  handleTagClick = (tagId) => {
    const { availableCategories, categories, selectedCategories } = this.state;
    const tag = availableCategories.find((tag) => tag.id === tagId);
    if (tag) {
      // use this to populate categories array
      const newCategories = [...categories, { tag_name: tag.category }];
      //   use this to render the selected categories
      const pickedCategories = [...selectedCategories, tag];
      this.setState({
        categories: newCategories,
        search: "",
        selectedCategories: pickedCategories,
      });
    }
  };

  handleTagRemove = (tagId) => {
    const { categories, selectedCategories } = this.state;
    const newCategories = selectedCategories.filter((tag) => tag.id !== tagId);
    // MAPS the filtered array to only return ids
    const tagIds = newCategories.map((tag) => tag.id);
    // set the categories array with remaining tag ids, while setting the selceted
    // categories less the removed tag
    this.setState({ categories: tagIds, selectedCategories: newCategories });
  };

  render() {
    const { categories, search, availableCategories, selectedCategories } =
      this.state;

    this.props.func(categories);

    return (
      <div>
        <Box
          Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {selectedCategories.map((tag) => (
            <ListItem key={tag.id}>
              <Chip
                label={tag.category}
                variant="outlined"
                color="success"
                onDelete={() => this.handleTagRemove(tag.id)}
              />
            </ListItem>
          ))}
        </Box>
        <input
          type="text"
          value={search}
          onChange={this.handleSearchChange}
          placeholder="Search categories..."
          className="focus:outline-none text-xs mb-4"
        />
        <ul>
          {search !== ""
            ? availableCategories
                .filter((tag) =>
                  tag.category.toLowerCase().includes(search.toLowerCase())
                )
                .map((tag) => (
                  <li
                    style={{
                      cursor: "pointer",
                      transition: "cursor 0.3s ease-in-out",
                    }}
                    key={tag.id}
                    onClick={() => this.handleTagClick(tag.id)}
                  >
                    {tag.category}
                  </li>
                ))
            : null}
        </ul>
      </div>
    );
  }
}

export default TagSelector;
