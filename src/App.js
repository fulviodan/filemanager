import React from "react";
import axios from "axios";

import urljoin from "urljoin";
import ds4biz from "ds4biz-components";
import path from "path";

import { FiFolder, FiArchive } from "react-icons/fi";
const { components } = ds4biz;

var base = "http://localhost:8080/ds4biz/file-storage/0.1/";

class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = { path: "/", docs: [] };
		this.todelete = {};
	}
	render() {
		const links = this.state.docs.map((obj, i) => {
			if (obj.type == "file") {
				return (
					<span id={obj.id}>
						<FiArchive />{" "}
						<a
							href={urljoin(base, "content") + "?path=" + obj.id}
							onClick={ev => console.log(ev.target)}
						>
							{obj.name}
						</a>
					</span>
				);
			} else {
				return (
					<span id={obj.id}>
						<FiFolder />{" "}
						<a
							href="#"
							onClick={ev => {
								console.log(obj.id);

								this.retrieveDocs(obj.id);
							}}
						>
							{obj.name}
						</a>
					</span>
				);
			}
		});

		return (
			<div>
				<div>{this.buildNav()}</div>
				<components.Table
					className="table"
					key={this.state.path}
					header={["", "name"]}
					data={links.map((v, i) => [
						<input
							type="checkbox"
							key={v.props.id}
							defaultValue={this.todelete[v.props.id]}
							onChange={ev => this.toggleDelete(v.props.id, ev.target.checked)}
						/>,
						v
					])}
				/>
				<input type="file" onChange={ev => this.upload(ev)} multiple />

				<button onClick={ev => this.createDir(ev)}>Create dir</button>
				<button onClick={ev => this.delete()}>Delete</button>
			</div>
		);
	}

	buildNav() {
		const ret = [];
		ret.push(
			<a href="#" onClick={ev => this.retrieveDocs("/")}>
				/
			</a>
		);
		const temp = [];
		if (this.state.path != "/") {
			for (let p of this.state.path.split("/")) {
				const link = path.join(...temp, p);
				console.log(p, link);
				ret.push(
					<span>
						<a href="#" onClick={ev => this.retrieveDocs(link)}>
							{p}
						</a>
						/
					</span>
				);
				temp.push(p);
			}
		}

		return ret;
	}

	toggleDelete(doc, checked) {
		if (checked) {
			this.todelete[doc] = true;
		} else {
			delete this.todelete[doc];
		}
		console.log(JSON.stringify(this.todelete));
	}

	upload(ev) {
		const files = [...ev.target.files];
		const targ = ev.target;
		files.map(f => {
			var formData = new FormData();
			formData.append("file", f);
			axios
				.post(base + "content", formData, {
					params: { path: this.state.path },
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				.then(resp => {
					this.retrieveDocs(this.state.path);
					targ.value = "";
				});
		});
	}
	delete() {
		const y = confirm("Are you sure?");
		if (y) {
			axios
				.post(urljoin(base, "content/delete"), Object.keys(this.todelete))
				.then(resp => {
					this.retrieveDocs();
					this.todelete = {};
				});
		}
	}

	retrieveDocs(path) {
		path = path || this.state.path;
		axios
			.get(urljoin(base, "content"), {
				params: { path: path }
			})
			.then(resp => {
				this.setState({ docs: resp.data, path: path });
				this.todelete = [];
			});
	}

	componentDidMount() {
		this.retrieveDocs("/");
	}
	createDir() {
		var newdir = prompt("Please enter directory name", "");

		if (newdir) {
			const nd = this.state.path + "/" + newdir;
			console.log("ND", nd);

			axios.post(base + "content/mkdir", null, { params: { path: nd } }).then(
				resp => this.retrieveDocs(),
				err => console.log(err)
			);
		}
	}
}

export default () => (
	<div className="container">
		<View />
	</div>
);
