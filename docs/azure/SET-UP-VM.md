# SET-UP-VM

- Go to Microsoft Azure
- Use 12 month free subscription or Azure students
- Create two linux Ubuntu VMs with same network group: app and jenkins
- SSH to them using azure key pem

## Homepage of Azure

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/azure/azure-1.png" width=1000 height=1000>
    Homepage of Azure now click Virtual Machines
</p>

## Create a Virtual Machine

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/azure/azure-2.png" width=1000 height=1000>
    Here the config
</p>

- We generate or use a key pair with our choices
<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/azure/azure-3.png" width=1000 height=1000>
    Here the config
</p>
- We select inbound ports(firewall) to open up ssh, http and https so we can connect to them later
- Afer that review and done

## App VM info

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/azure/azure-4.png" width=1000 height=1000>
    Notice only public IP
</p>

## Jenkins VM info

<p align="center">
    <img src="https://github.com/anhminhbo/BITS-Pomodoro-Music/blob/minh-dev/docs/azure/azure-5.png" width=1000 height=1000>
    Notice only public IP
</p>

- SSH to the server using:

```
ssh -i "azure.pem" azureuser@{{public.ip}}
```
