import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteProjectTask } from "../../actions/backlogActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Backlog extends Component {
  onDeleteClick(backlog_id, pt_id) {
    this.props.deleteProjectTask(backlog_id, pt_id);
  }
  render() {
    const { project_tasks1 } = this.props;

    const tasks1 = project_tasks1.map(project_task => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));

    let priorityClass;

    const tasks = project_tasks1.map(project_task => (
      <div className="card mb-1 bg-light">
        <div
          className={
            "card-header text-primary " +
            (project_task.priority === 1 ? "bg-danger text-light" : "") +
            (project_task.priority === 2 ? "bg-warning text-light" : "") +
            (project_task.priority === 3 ? "bg-info text-light" : "")
          }
        >
          ID: {project_task.projectSequence} -- Priority:{" "}
          {project_task.priority}
          {project_task.priority === 1 && " HIGH "}
          {project_task.priority === 2 && " MEDIUM "}
        </div>
        <div className="card-body bg-light">
          <h5 className="card-title">{project_task.summary}</h5>
          <p className="card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </p>
          <Link
            to={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
            className="btn btn-primary"
          >
            View / Update
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              project_task.projectIdentifier,
              project_task.projectSequence
            )}
          >
            Delete
          </button>
        </div>
      </div>
    ));

    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    for (let i = 0; i < tasks1.length; i++) {
      if (tasks1[i].props.project_task.status === "TO_DO") {
        todoItems.push(tasks[i]);
      }
      if (tasks1[i].props.project_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      }
      if (tasks1[i].props.project_task.status === "DONE") {
        doneItems.push(tasks[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}
Backlog.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteProjectTask }
)(Backlog);
