import json
import requests

headers = {
    "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6"
}

def make_initial_request(url):
    initial_query = {
        "operationName": "categoryGridRetrieve",
        "variables": {
            "id": "15d5dd18-d9f7-4dfd-bb6b-4c0b1cbf40ff",
            "pageArgs": {
                "size": 1,
                "offset": 0
            },
            "sortBy": None,
            "filterBy": ["storeDisplayClassification:FULL_GAME", "storeDisplayClassification:GAME_BUNDLE", "storeDisplayClassification:PREMIUM_EDITION"],
            "facetOptions": []
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "4ce7d410a4db2c8b635a48c1dcec375906ff63b19dadd87e073f8fd0c0481d35"
            }
        }
    }
    response = requests.post(url, json=initial_query, headers=headers)
    data = response.json()
    print(data)
    total_count = data['data']['categoryGridRetrieve']['pageInfo']['totalCount']
    return total_count

def make_second_request(url, size):
    second_query = {
        "operationName": "categoryGridRetrieve",
        "variables": {
            "id": "15d5dd18-d9f7-4dfd-bb6b-4c0b1cbf40ff",
            "pageArgs": {
                "size": size,
                "offset": 0
            },
            "sortBy": None,
            "filterBy": ["storeDisplayClassification:FULL_GAME", "storeDisplayClassification:GAME_BUNDLE", "storeDisplayClassification:PREMIUM_EDITION"],
            "facetOptions": []
        },
        "extensions": {
            "persistedQuery": {
                "version": 1,
                "sha256Hash": "4ce7d410a4db2c8b635a48c1dcec375906ff63b19dadd87e073f8fd0c0481d35"
            }
        }
    }
    response = requests.post(url, json=second_query, headers=headers)
    data = response.json()
    return data

# Veriyi dosyaya yazacak fonksiyon
def save_to_json(data, filename):
    games_data = {'games': data}
    with open(filename, 'w') as f:
        json.dump(games_data, f)

# Ana işlemi gerçekleştirecek fonksiyon
def main():
    url = 'https://web.np.playstation.com/api/graphql/v1//op'
    total_count = make_initial_request(url)
    print("Total count:", total_count)
    games = make_second_request(url, total_count)['data']['categoryGridRetrieve']['products']
    save_to_json(games, 'db.json')
    print("Data saved to db.json")

if __name__ == "__main__":
    main()
