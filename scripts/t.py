#!/usr/bin/python3
########################################################################
# Sujet:              Outils pour cibler la fonctionnalité Wake On LAN.
# Version:              1.0
# Code repos:            https://github.com/RutAnimalJunk/wol-e
# Screen de test:        http://code.google.com/p/wol-e
# Credits:              JV | MT
#                       
########################################################################
#
# Outil ci-dessous utilisé pour scanner les adresses MAC Synology
# les ports installent scapy && les ports installent py25-pcapy && wget http://oss.coresecurity.com/repo/Impacket-0.9.6.0.tar.gz && tar -xf Impacket-0.9.6.0.tar.gz && cd Imp* && installation sudo python2.5 setup.py
#

from __future__ import with_statement
from impacket.ImpactDecoder import *
import socket, struct # Permets de créer/configurer/gérer des sockets // Travailler avec des protocoles réseau
import sys, os, datetime, time # Permets d'avoir accès aux variables systèmes // Opérations liées au système d'exploitation // Créer/manipuler des objets de date et heure // Permet de voir le temps écoulé 
import math # Permets de faire des opérations mathématiques avancées
import scapy.utils # Permets de simplifier la manipulation et l'analyse des paquets réseau
import scapy.layers.l2 # Permets de créer/manipuler/analyser des trames
import scapy.route # Permets de gérer les infos sur les routes réseau
import scapy # Permets de manipuler/analyser des paquets
import pcapy # Permets de capturer/manipuler le traffic réseau (paquets)
import multiprocessing  # Permets l'utilisation de plusieurs taches en même temps
import time # Permets dans ce code de quantifié le temps qu'a pris le brute force


def readf(f):
    with open(f, "r") as fh:
        return fh.readlines()


def writef(f, l):
    with open(f, 'w') as fw:
        fw.write(l)


def writea(f, l):
    with open(f, 'a') as fh:
        fh.write(l)


class Sniff:
    def __init__(self, args):
        if len(args) < 2:
            print("\t[*] Veuillez spécifier un adaptateur à partir duquel collecter les mots de passe WOL. Ex: eth1")
            sys.exit(2)
        print("\n\t[*] WOL-E " + version + " [*]\n\t[*] Wake on LAN Explorer - WOL Packet Sniffer.")
        print("\t[*] WOL packet sniffer a commencé [*]")

        # liste tous les périphériques réseaux
        pcapy.findalldevs()

        pc = pcapy.open_live(args, 1024, False, 100)
        pc.setfilter('udp')

    # rappel pour les paquets reçus
    def recv_pkts(hdr, data):
        packet = str(EthDecoder().decode(data))
        src_mac = packet[30:47]  # Assurez-vous que ces indices correspondent à la position de l'adresse MAC source dans le paquet

        if src_mac.startswith('00:11:32'):
            # C'est une adresse MAC Synology, vous pouvez effectuer ici toutes les actions que vous souhaitez
            print(f"[*] Adresse MAC Synology détectée: {src_mac}")
            # Enregistrez l'adresse MAC Synology dans un fichier ou effectuez d'autres actions ici
        else:
            # Ce n'est pas une adresse MAC Synology
            pass

        packet_limit = -1
        pc.loop(packet_limit, recv_pkts)

# Définir une fonction à appeler pour chaque plage MAC en parallèle
def process_mac_range(mac_range):
    print("\t[*] Bruteforce en cours " + mac_range + ":00:00 -> " + mac_range + ":FF:FF")
    for y in range(0, 255):
        for z in range(0, 255):
            macaddress = mac_range + ":" + hex(y).replace('0x', '').zfill(2) + ":" + hex(z).replace('0x','').zfill(2)
            sep = macaddress[2]
            macaddress = macaddress.replace(sep, '')
            data = ''.join(['FFFFFFFFFFFF', macaddress * 16])
            send_data = ''
            for i in range(0, len(data), 2):
                send_data = ''.join([send_data, struct.pack('B', int(data[i: i + 2], 16))])
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
            sock.sendto(send_data, (bcast, port))
            time.sleep(0.001)

def wake_on_lan(version):  # Modification de la définition wake on lan pour qu'elle soit compatible avec le multi-thread

    # WOL Bruteforcer par rapport à une liste de plages MAC (temps fastidieux en raison du nombre d'adresses possibles)
    if sys.argv[1] == "-a":
        print("\n\t[*] WOL-E " + version + " [*]\n\t[*] Wake on LAN Explorer - WOL plage de Bruteforce d'adresse MAC")
        bcast = '255.255.255.255'
        macs = os.getcwd() + "/" + "bfmac.lst"
    else:
        print("\n\t[*] Commande inconnue, veuillez consulter la documentation d'aide pour plus d'informations \n")
        sys.exit(2)
    if len(sys.argv) < 3:
        print("\n\t[*] Aucun port de destination détecté, utilisant 9 comme valeur par défaut")
        port = int(9)
    else:
        print("\t[*] Port personnalisé détecté: " + str(sys.argv[3]))
        port = int(sys.argv[3])
        
    if os.path.exists(macs) is False:
        print("\n\t[*] Veuillez vous assurer que vous disposez du fichier bfmac.lst dans le répertoire de travail actuel\n")
        sys.exit(2)
    else:
        f = open(macs)
        print("\t[*] WOL Bruteforce en cours...")

        # Lire la liste des adresses MAC
        mac_ranges = [line.strip() for line in f]

        # Créer un pool multi-traitement
        pool = multiprocessing.Pool()

        # Utilisez le pool pour traiter les plages MAC en parallèle
        pool.map(process_mac_range, mac_ranges)

        pool.close()
        pool.join()

        f.close()
        print("\n\t[*] Bruteforce des adresses MAC terminées. Sortie [*]\n")
        sys.exit(2)

    def write_output():

        def clear_arp():
            print("\t[*] Réparation du cache ARP... Veuillez patienter")

            sp = sys.platform
            if sp == 'darwin':
                os.system('arp -d -a > /dev/null')
            elif sp == 'linux':
                os.system('ip neigh flush all > /dev/null')
            print("\t[*] Cache ARP nettoyé")

        def c(l):
            return [line.lower().rstrip() for line in l]

        def read_and_trim(f):
            return c(readf(f))

        def w_output(x1, x2, x3):
            for s in x1:
                for l in x2:
                    if l in s and s not in x3:
                        print("\t[*] Appareil Synology détecté: " + str(s) + ". Enregistré dans SynologyTargets.txt")

        scan_results = read_and_trim('netscan.txt')
        logged_lines = read_and_trim('SynologyMAC.lst')
        target_lines = read_and_trim('SynologyTargets.txt')

        w_output(scan_results, logged_lines, target_lines)
        clear_arp()
        print("\n\t[*] Analyse terminée [*]\n")
        sys.exit(2)

    def scan_and_print_neighbors(net, interface):
        print("\t[*] arping", net, "on", interface)
        ans, unans = scapy.layers.l2.arping(net, iface=interface, timeout=1, verbose=False)
        d = open('netscan.txt', 'w')
        for s, r in ans.res:
            array = []
            array.append(r.sprintf("%Ether.src% %ARP.psrc%"))
            for item in array:
                d.write("%s\n" % item)
        d.close()
        write_output()

    local_ip = os.popen(
        "ifconfig | grep 'inet ' | grep -v '127.0.0.1' | awk '{ print $2}' | head -1 | sed 's/addr\://g'").read().rstrip()

    for route in scapy.config.conf.route.routes:
        network = route[0]
        netmask = route[1]
        interfa = route[3]
        local_ip = route[4]

        if netmask <= 0x0 or netmask == 0xFFFFFFFF:
            continue
        if local_ip == l:
            net = to_CIDR_notation(network, netmask)
            if net:
                scan_and_print_neighbors(net, interfa)

    # Activation manuelle du WOL pour des adresses uniques
    if sys.argv[1] == "-m":
        if len(sys.argv) < 3:
            print("\n\t[-] Veuillez spécifier une adresse MAC\n")
            sys.exit(2)
        macaddress = sys.argv[2]
        if len(macaddress) == 12:
            pass
        elif len(macaddress) == 12 + 5:
            sep = macaddress[2]
            macaddress = macaddress.replace(sep, '')
        else:
            print("\n\t[*] Veuillez vérifier le format de l'adresse MAC. Exemple : 00:1A:2B:3C:4D:5E\n")
            sys.exit(2)
        if len(sys.argv) < 4:
            print("\n\t[*] Aucune adresse de diffusion ou port de destination détecté, en utilisant la valeur par défaut de 255.255.255.255 et 9 respectivement\n")
            bcast = '255.255.255.255'
            destport = int(9)
        else:
            bcast = sys.argv[4]
            destport = int(sys.argv[6])
        wolpass = "0"
        if len(sys.argv) > 7:
            wolpass = sys.argv[8]
        if len(wolpass) == 12:
            pass
        elif len(wolpass) == 12 + 5:
            sep = wolpass[2]
            wolpass = wolpass.replace(sep, '')
        else:
            wolpass = "Vide"

        print("\n\t[*] WOL-E " + version + " [*]\n\t[*] Wake on LAN Explorer - Allume les ordinateurs du réseau avec WOL activé.\n")
        print("\t\tAdresse Mac: " + macaddress)
        print("\t\tDiffusion: " + str(bcast))
        print("\t\tPort de destination: " + str(destport))
        print("\t\tMot de passe: " + wolpass)
        print("\n\n")

        if wolpass != "Vide":
            data = ''.join(['FFFFFFFFFFFF', macaddress * 16, wolpass])
        else:
            data = ''.join(['FFFFFFFFFFFF', macaddress * 16])
        send_data = ''

        for i in range(0, len(data), 2):
            send_data = ''.join([send_data, struct.pack('B', int(data[i: i + 2], 16))])

        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        sock.sendto(send_data, (bcast, destport))
        print("\t[*] Essaye de mettre sous tension " + sys.argv[2] + " Fait ! \n")
        sys.exit(2)

    # Section de détection de mots de passe WOL
    if sys.argv[1] == "-s":
        Sniff(sys.argv[3])

    # Tentative de réveiller tous les clients Synology collectés lors d'une analyse précédente à l'aide de -f
    if sys.argv[1] == "-fa":
        print("\n\t[*] WOL-E " + version + " [*]\n\t[*] Explorateur Wake on LAN - WOL Détecte les clients Synology")
        bcast = '255.255.255.255'
        synology = os.getcwd() + "/" + "SynologyTargets.txt"
        if os.path.exists(synology) is False:
            print("\n\t[*] Veuillez vous assurer que vous disposez du fichier SynologyTargets.txt dans le répertoire de travail actuel.\n")
            sys.exit(2)
        if len(sys.argv) < 3:
            print("\n\t[*] Aucun port de destination détecté, utilisant 9 comme valeur par défaut")
            port = int(9)
        else:
            print("\t[*] Port précis détecté : " + str(sys.argv[3]))
            port = int(sys.argv[3])
        f = open(synology)
        linenums = 0
        for lines in f:
            linenums = linenums + 1
            macaddress = lines[0:17]
            sep = macaddress[2]
            macaddress = macaddress.replace(sep, '')
            data = ''.join(['FFFFFFFFFFFF', macaddress * 16])
            send_data = ''

            for i in range(0, len(data), 2):
                send_data = ''.join([send_data, struct.pack('B', int(data[i: i + 2], 16))])

            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
            sock.sendto(send_data, (bcast, port))
            time.sleep(0.005)
        print("\n\t[*] " + str(linenums) + " Les clients Synology détectés ont reçu des requêtes WOL, Sortie.\n")
        f.close()
        sys.exit(2)
        
    # WOL Bruteforcer par rapport à une liste de plages MAC (temps fastidieux en raison du nombre d'adresses possibles)
    if sys.argv[1] == "-a":
        print("\n\t[*] WOL-E " + version + " [*]\n\t[*] Wake on LAN Explorer - WOL Bruteforce MAC ranges.")
        bcast = '255.255.255.255'
        macs = os.getcwd() + "/" + "bfmac.lst"
    else:
        print("\n\t[*] Commande inconnue, veuillez consulter la documentation d'aide pour plus d'informations\n")
        sys.exit(2)
    if len(sys.argv) < 3:
        print("\n\t[*] Aucun port de destination détecté, utilisant 9 comme valeur par défaut")
        port = int(9)
    else:
        print("\t[*] Port personnalisé détecté : " + str(sys.argv[3]))
        port = int(sys.argv[3])
    if os.path.exists(macs) is False:
        print("\n\t[*] Veuillez vous assurer que vous disposez du fichier bfmac.lst dans le répertoire de travail actuel\n")
        sys.exit(2)
    else:
        f = open(macs)
        print("\t[*] WOL Bruteforce a commencé")
        start_time = time.time()  # Enregistrez l'heure de début du bruteforce
        for line in f:
            print("\t[*] BruteForce en cours " + str(line).rstrip() + ":00:00 -> " + str(line).rstrip() + ":FF:FF")
            for y in range(0, 255):
                for z in range(0, 255):
                    line = line.rstrip()
                    if len(line) < 11 or len(line) > 11:
                        print("\n\t[*] Adresse MAC incorrecte, veuillez corriger le contenu de bfmac.lst\n\t[*] Exemple : 00:12:34\n")
                        sys.exit(2)
                    macaddress = line + ":" + hex(y).replace('0x', '').zfill(2) + ":" + hex(z).replace('0x', '').zfill(2)
                    sep = macaddress[2]
                    macaddress = macaddress.replace(sep, '')

                    data = ''.join(['FFFFFFFFFFFF', macaddress * 16])
                    send_data = ''

                    for i in range(0, len(data), 2):
                        send_data = ''.join([send_data, struct.pack('B', int(data[i: i + 2], 16))])

                    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
                    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
                    sock.sendto(send_data, (bcast, port))
                    time.sleep(0.001)
        f.close()
        end_time = time.time()  # Enregistrez l'heure de fin du bruteforce
        elapsed_time = end_time - start_time  # Calculez le temps écoulé
        print("\n\t[*] Bruteforce des adresses MAC terminé. Temps écoulé : {:.2f} secondes\n".format(elapsed_time))
        sys.exit(2)

if __name__ == '__main__':
    version = "1.0"
    help_message = "\n\t[*] WOL-E " + version + " [*]\n\t[*] Wake on LAN Explorer - Une collection d'outils WOL [*]\n\t[*] by MT/JV [*]\n\n\t[*] Besoin d'aide ? : wol-e.py -h\n"

    if len(sys.argv) < 2:
        print(help_message)
        sys.exit(2)

    if sys.argv[1] == "-h":
        bold = "\033[1m"
        nobold = "\033[0;0m"
        print(bold + "\n[*] WOL-E " + version + "\n[*] Wake on LAN Explorer - Une collection d'outils WOL \n[*] by MT/JV \n" + nobold)

        print("\t-m")
        print(bold + "\t\tRéveiller des ordinateurs individuels" + nobold)
        print("\t\tSi un mot de passe est requis, utilisez le -k 00:12:34:56:78:90 à la fin de la commande ci-dessus" + nobold)
        print(bold + "\t\twol-e.py -m 00:12:34:56:78:90 -b 192.168.1.255 -p <port> -k <mdp>" + nobold)
        print("\t\tDefaults: ")
        print("\t\tPort: 9")
        print("\t\tDiffusion: 255.255.255.255")
        print("\t\tMDP: vide\n")

        print("\t-s")
        print(bold + "\t\tRenifler le réseau à la recherche de requêtes WOL et de mots de passe" + nobold)
        print("\t\tToutes les demandes WOL capturées seront affichées à l'écran et écrites dans WOLClients.txt")
        print(bold + "\t\twol-e.py -s -i eth0\n" + nobold)

        print("\t-a")
        print(bold + "\t\tBruteforce alimentant les clients WOL." + nobold)
        print(bold + "\t\twol-e.py -a -p <port>" + nobold)
        print("\t\tPlacez les plages d'adresses dans le bfmac.lst que vous souhaitez BruteForce")
        print("\t\tIls doivent être au format suivant :")
        print("\t\t00:12:34:56")
        print("\t\tPort par défaut: 9\n")

        print("\t-f")
        print(bold + "\t\tDétection des appareils Synology sur le réseau pour l'activation WOL." + nobold)
        print("\t\tCela s'affichera à l'écran et écrira dans SynologyTargets.txt pour les adresses MAC Synology détectées")
        print(bold + "\t\twol-e.py -f\n" + nobold)

        print("\t-fa")
        print(bold + "\t\tEssayez de réveiller toutes les cibles Synology détectées dans SynologyTargets.txt" + nobold)
        print("\t\tCela enverra un seul paquet WOL à chaque client de la liste et vous indiquera combien de clients ont été tentés")
        print(bold + "\t\twol-e.py -fa\n" + nobold)
        sys.exit(2)

    wake_on_lan(version)
