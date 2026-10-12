# Task Tracker CLI

This project is a solution to the [Task Tracker project on roadmap.sh](https://roadmap.sh/projects/task-tracker).

A lightweight, zero-dependency command-line interface (CLI) application for tracking and managing your daily tasks. Built entirely with Node.js native modules (`fs` and `process`), it uses a local JSON file to persist your data.

## Features

- **Zero Dependencies:** Built without third-party frameworks like Commander or Yargs.
- **Persistent Storage:** Automatically creates and updates a local `task.json` file.
- **Status Tracking:** Categorize tasks as `todo`, `in-progress`, or `done`.
- **Filtering:** Quickly list all tasks or filter them by their current status.
- **Timestamping:** Automatically tracks `createdAt` and `updatedAt` for every task.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Setup & Installation

1. Clone this repository to your local machine:
    ```bash
    git clone <your-github-repo-url>
    cd <your-repo-folder>
    ```
