# Contentful Content Structure Guide

## Project Content Structure

### 1. **Cover Image** (for Projects Grid)
- **Field**: `media` (Media field - Array of Assets)
- **Position**: First item in the `media` array (`media[0]`)
- **Usage**: This image appears in the Projects grid as the cover/thumbnail
- **Format**: Image file (JPG, PNG, etc.)
- **Note**: The first media item is always used as the cover image

### 2. **Project Content** (Images, Videos, Text)
- **Field**: `media` (Media field - Array of Assets)
- **Position**: All items in the `media` array (including the first one)
- **Usage**: All media items are displayed on the single project page
- **Format**: 
  - Images: JPG, PNG, etc.
  - Videos: Use the `link` field for YouTube videos (see below)

### 3. **Video Content**
- **Field**: `link` (Short text field)
- **Format**: YouTube URL (e.g., `https://youtu.be/VIDEO_ID`)
- **Behavior**: 
  - If `link` contains 'youtu', it displays as a video player
  - If no `link` or it's not YouTube, it displays the first `media` item as an image
- **Autoplay**: Use `autoplay` (Boolean field) to control autoplay

### 4. **Text Content**
- **Title**: `title` (Rich text field)
  - Appears in the Projects grid overlay
  - Appears at the top of the single project page
- **Description**: `description` (Rich text field)
  - Appears below the title on the single project page
  - Supports rich text formatting

### 5. **Section/Category** (Project Tagging)
- **How it works**: Projects are organized by **Sections** in Contentful
- **Location**: Add projects to the appropriate Section by **Section Name**:
  - **Interactive Installations**: Section name must be exactly `Interactive Installations`
  - **XR**: Section name must be exactly `XR`
  - **A/V Concerts**: Section name must be exactly `A/V Concerts`
  - **Digital Theatre**: Section name must be exactly `Digital Theatre`
- **Method**: 
  1. Create or edit a Section in Contentful
  2. Set the Section's `name` field to one of the exact names above (e.g., "XR", "A/V Concerts", etc.)
  3. Add projects to that Section's `projects` field (Reference field - Many references)
  4. The project will automatically appear in the corresponding filter category

## Step-by-Step Guide

### Creating a New Project:

1. **Create Project Entry**:
   - Content Type: `project`
   - Fill in:
     - `title` (Rich text) - Project title
     - `description` (Rich text) - Project description/text
     - `autoplay` (Boolean) - Whether video should autoplay

2. **Add Cover Image**:
   - In `media` field, add the first image
   - This will be the cover shown in the Projects grid

3. **Add Additional Content**:
   - Add more images to the `media` array
   - These will all display on the single project page

4. **Add Video (if needed)**:
   - Add YouTube URL to `link` field
   - Set `autoplay` to true/false
   - Note: If `link` is a YouTube URL, it will show as video instead of the first media image

5. **Assign to Section**:
   - Go to the appropriate Section entry
   - Add this project to the Section's `projects` field
   - The project will appear in that category's filter

## Example Project Structure:

```
Project Entry:
├── title: "My Project Title"
├── description: "Project description text..."
├── media: [
│     Image 1 (Cover - shown in grid),
│     Image 2 (shown on project page),
│     Image 3 (shown on project page)
│   ]
├── link: "https://youtu.be/VIDEO_ID" (optional)
└── autoplay: true/false

Section Entry:
└── projects: [Project 1, Project 2, ...]
```

## Current Code References:

- **Cover Image**: `src/pages/Projects.tsx` line 79-81 (`project.media?.[0]`)
- **Project Content**: `src/components/ContentfulLayout.tsx` line 38-50
- **Section Mapping**: `src/pages/Projects.tsx` line 15-20 (`SECTION_NAME_TO_CATEGORY`)
