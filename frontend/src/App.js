import React, { Component } from 'react';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import querystring from 'querystring';
import classNames from 'classnames';

import meetupLogo from './meetup_logo.svg';
import swarmIconsSprite from 'swarm-icons/dist/sprite/sprite.inc';
import './App.css';
import Meetups from './components/Meetups';

import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Section from 'meetup-web-components/lib/layout/Section';
import Button from 'meetup-web-components/lib/forms/Button';
import { Tabs, TabsTab } from 'meetup-web-components/lib/interactive/Tabs';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tab: 0,
			meetups: [],
			favorites: null,
			query: 'javascript',
			searchedQuery: 'javascript',
			loading: false,
			loadingFavorites: false,
			error: false,
			errorFavorites: false,
		};
	}

	// fetch from API events (based on a search term)
	fetchEvents() {

		this.setState({
      searchedQuery: this.state.query,
			meetups: [],
			loading: true,
			error: false,
		});

		const qs = querystring.stringify({
			zip: '10012',
			text: this.state.query,
			fields: 'rsvp_sample',
			page: '15',
			key: '6752511f3291b2b182ee4d2ef312',
			time: '1w,',
		});

		const apiUrl = `https://api.meetup.com/2/open_events/?${qs}`;
		const self = this;

		fetchJsonp(apiUrl)
			.then(response => response.json())
			.then(json =>
				self.setState({
					meetups: json.results,
					loading: false,
					error: false,
				})
			)
			.catch(ex => {
				console.error(ex);
				self.setState({
					meetups: [],
					loading: false,
					error: true,
				});
			});
	}

	// fetch from API all the favorites
	fetchFavorites() {

		this.setState({
			loadingFavorites: true,
			errorFavorites: false,
		});

		const apiUrl = `http://localhost:8080/api/v1/favorites`;
		const self = this;

    axios.get(apiUrl)
      .then(response => {
        self.setState({
          favorites: response.data.map(favorite => { return favorite.meetup_id }),
          loadingFavorites: false,
          errorFavorites: false,
        })
      })
      .catch(error => {
        console.error(error);
        self.setState({
          favorites: [],
          loadingFavorites: false,
          errorFavorites: true,
        });
      });
	}

	// return only favorite meetups
	getFavoritesMeetups() {
		if (this.state.favorites === null || this.state.favorites.length === 0 || this.state.meetups.length === 0) {
			return [];
		}

		return this.state.meetups.filter(meetup => this.state.favorites.indexOf(meetup.id) !== -1);
	}

	componentDidMount() {
		this.fetchEvents();
		this.fetchFavorites();
	}

	componentDidUpdate(prevProps, prevState)
	{
		// refresh events/favorites on tab change
		if (prevState.tab !== this.state.tab) {
			if (this.state.tab === 0) {
				this.fetchEvents();
			}
			else if (this.state.tab === 1) {
				this.fetchFavorites();
			}
		}
	}

	// change tab
	handleTabChange = (tab) => {
		this.setState({
			tab: tab,
		});
	}

	// change input value
	handleInputChange = (e) => {
    this.setState({
			query: e.target.value
    });
	}

	// submit search
	handleSubmit = (e) => {
		e.preventDefault();
		this.fetchEvents();
	}

	render() {

		return (
			<div>
				<div style={{'display': 'none'}} dangerouslySetInnerHTML={{__html: swarmIconsSprite}} />
        <Section>
          <Bounds className="align--center">
            <img src={meetupLogo} className="logo" alt="logo" />
          </Bounds>
        </Section>
        <Section>
          <Bounds className="align--center">
						<Tabs>
							<TabsTab isSelected={this.state.tab === 0} onClick={this.handleTabChange.bind(this, 0)}>
									Search
							</TabsTab>
							<TabsTab isSelected={this.state.tab === 1} onClick={this.handleTabChange.bind(this, 1)}>
									Favorites
							</TabsTab>
						</Tabs>
          </Bounds>
        </Section>
				<div className={classNames({'display--none': this.state.tab === 1})}>
					<Section>
						<form onSubmit={this.handleSubmit}>
							<div className="row bounds bounds--wide">
								<div className="row-item chunk">
									<input
										id="query"
										type="text"
										name="query"
                    value={this.state.query}
										onChange={this.handleInputChange}
										placeholder="Find some Meetups..."
									/>
								</div>
								<div className="row-item chunk row-item--shrink">
									<Button type="submit" className="button--primary">Search</Button>
								</div>
							</div>
						</form>
					</Section>
					<Section>
						<Bounds>
							<h1 className="text--display1 margin--bottom">
								{this.state.searchedQuery} Meetups
							</h1>
							{this.state.error ? (
								<p className="text--error text--bold">
									Looks like something went wrong…
								</p>
							) : (
								''
							)}
							{this.state.loading ? (
								<div className="loader">Loading...</div>
							) : (
								<Meetups
									query={this.state.query}
									error={this.state.error}
									meetups={this.state.meetups}
									favorites={this.state.favorites}
								/>
							)}
						</Bounds>
					</Section>
				</div>
        <div className={classNames({'display--none': this.state.tab === 0})}>
          <Section>
            <Bounds>
              <h1 className="text--display1 margin--bottom">
                Your favorites Meetups
              </h1>
              {this.state.errorFavorites ? (
                <p className="text--error text--bold">
                  Looks like something went wrong…
                </p>
              ) : (
                ''
              )}
              {this.state.loadingFavorites ? (
                <div className="loader">Loading...</div>
              ) : (
                <Meetups
                  error={this.state.errorFavorites}
                  meetups={this.getFavoritesMeetups()}
                  favorites={null}
                />
              )}
            </Bounds>
          </Section>
				</div>
			</div>
		);
	}
}

export default App;
