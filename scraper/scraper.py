from bs4 import BeautifulSoup
import requests
import json
from time import sleep


def bugScrape():
    url = 'https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)'
    response = requests.get(url, timeout=5)
    content = BeautifulSoup(response.content, "html.parser")

    bugTable = content.find('table', attrs={'class': 'sortable'})
    tr = bugTable.findAll('tr')
    table = []
    for row in tr:
        rowvar = []
        for i in row:
            if i != None:
                try:
                    try:
                        img = i.find('img')['data-src']
                        png = img.index('.png')
                        rowvar.append(i.find('img')['data-src'][:png+4])
                    except:
                        rowvar.append(i.text.strip())
                except:
                    pass
        table.append(rowvar)

    # print(table)

    with open('bugTable.json', 'w', encoding='utf8') as outfile:
        json.dump(table, outfile, ensure_ascii=False)


def fishScrape():
    url = 'https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)'
    response = requests.get(url, timeout=5)
    content = BeautifulSoup(response.content, "html.parser")

    fishTable = content.find('table', attrs={'class': 'sortable'})
    tr = fishTable.findAll('tr')
    table = []
    for row in tr:
        rowvar = []
        for i in row:
            if i != None:
                try:
                    try:
                        img = i.find('img')['data-src']
                        png = img.index('.png')
                        rowvar.append(i.find('img')['data-src'][:png+4])
                    except:
                        rowvar.append(i.text.strip())
                except:
                    pass
        table.append(rowvar)

    # print(table)

    with open('fishTable.json', 'w', encoding='utf8') as outfile:
        json.dump(table, outfile, ensure_ascii=False)


def miscScrape():
    url = 'https://animalcrossing.fandom.com/wiki/Crafting_materials_(New_Horizons)'
    response = requests.get(url, timeout=5)
    content = BeautifulSoup(response.content, "html.parser")

    # miscTable = content.findAll('table', attrs={'class': 'roundy'})
    tr = content.findAll('tr')
    table = []
    for row in tr:
        rowvar = []
        for i in row:
            if i != None:
                try:
                    try:
                        img = i.find('img')['data-src']
                        png = img.index('.png')
                        if(img[png-4:png] == 'Coin'):
                            itext = i.text
                            itext = itext.replace(' ', '')
                            itext = itext.replace(',', '')
                            rowvar.append(itext.strip())
                        else:
                            rowvar.append(img[:png+4])
                    except:
                        rowvar.append(i.text.strip())
                except:
                    pass
        table.append(rowvar)

    # print(table)

    with open('miscTable.json', 'w', encoding='utf8') as outfile:
        json.dump(table, outfile, ensure_ascii=False)


# bugScrape()
# fishScrape()
miscScrape()
